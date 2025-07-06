import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UserPreferencesDto } from './dto/user-preferences.dto';

@Injectable()
export class UserService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getDashboardData(userId: string) {
    const supabase = this.supabaseService.getClient();
    
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      throw new NotFoundException('User profile not found');
    }
    
    // Get all bookings for statistics
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select(`
        *,
        flight:flight_id(*),
        return_flight:return_flight_id(*),
        passengers:passengers(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (bookingsError) {
      throw new BadRequestException(`Failed to fetch bookings: ${bookingsError.message}`);
    }
    
    // Calculate booking statistics
    const bookingStats = {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      pending: bookings.filter(b => b.status === 'pending').length,
    };
    
    // Get recent bookings (last 3)
    const recentBookings = bookings.slice(0, 3);
    
    // Get upcoming flights (confirmed bookings with future departure dates)
    const now = new Date();
    const upcomingFlights = bookings
      .filter(b => 
        b.status === 'confirmed' && 
        b.flight && 
        new Date(b.flight.departure_date) > now
      )
      .sort((a, b) => new Date(a.flight.departure_date).getTime() - new Date(b.flight.departure_date).getTime())
      .slice(0, 3);
    
    return {
      user: profile,
      bookingStats,
      recentBookings,
      upcomingFlights,
    };
  }

  async getUserProfile(userId: string) {
    const supabase = this.supabaseService.getClient();
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      throw new NotFoundException('User profile not found');
    }
    
    return profile;
  }

  async updateUserPreferences(userId: string, preferencesDto: UserPreferencesDto) {
    const supabase = this.supabaseService.getClient();
    
    // First check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('preferences')
      .eq('id', userId)
      .single();
    
    // Merge existing preferences with new ones
    const preferences = {
      ...(existingProfile?.preferences || {}),
      ...preferencesDto
    };
    
    // Update profile
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: userId, preferences })
      .select()
      .single();
    
    if (error) {
      throw new BadRequestException(`Failed to update preferences: ${error.message}`);
    }
    
    return data;
  }

  async getUserBookings(userId: string) {
    const supabase = this.supabaseService.getClient();
    
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        flight:flight_id(*),
        return_flight:return_flight_id(*),
        passengers:passengers(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new BadRequestException(`Failed to fetch bookings: ${error.message}`);
    }
    
    // Fetch airport data for mapping
    const { data: airports } = await supabase
      .from('airports')
      .select('id, code, name');
    
    // Map flight data to include airport codes
    const mappedBookings = bookings?.map(booking => ({
      ...booking,
      flight: booking.flight ? this.mapFlightData(booking.flight, airports || []) : null,
      return_flight: booking.return_flight ? this.mapFlightData(booking.return_flight, airports || []) : null,
    }));
    
    return mappedBookings;
  }

  async getBookingDetails(userId: string, bookingId: string) {
    const supabase = this.supabaseService.getClient();
    
    const { data: booking, error } = await supabase
      .from('bookings')
      .select(`
        *,
        flight:flight_id(*),
        return_flight:return_flight_id(*),
        passengers:passengers(*),
        tickets:tickets(*)
      `)
      .eq('id', bookingId)
      .eq('user_id', userId)
      .single();
    
    if (error || !booking) {
      throw new NotFoundException('Booking not found or does not belong to this user');
    }
    
    // Fetch airport data for mapping
    const { data: airports } = await supabase
      .from('airports')
      .select('id, code, name');
    
    // Map flight data to include airport codes
    const mappedBooking = {
      ...booking,
      flight: booking.flight ? this.mapFlightData(booking.flight, airports || []) : null,
      return_flight: booking.return_flight ? this.mapFlightData(booking.return_flight, airports || []) : null,
    };
    
    return mappedBooking;
  }

  async cancelBooking(userId: string, bookingId: string) {
    const supabase = this.supabaseService.getClient();
    
    // First check if the booking belongs to the user
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .eq('user_id', userId)
      .single();
    
    if (fetchError || !booking) {
      throw new NotFoundException('Booking not found or does not belong to this user');
    }
    
    // Update the booking status to cancelled
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
      .select()
      .single();
    
    if (error) {
      throw new BadRequestException(`Failed to cancel booking: ${error.message}`);
    }
    
    return data;
  }

  private mapFlightData(flight: any, airports: any[]) {
    const origin = airports.find((a) => a.id === flight.origin_id);
    const destination = airports.find((a) => a.id === flight.destination_id);

    return {
      ...flight,
      origin: origin?.code || 'UNKNOWN',
      destination: destination?.code || 'UNKNOWN',
    };
  }
}
