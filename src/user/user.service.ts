import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UserPreferencesDto } from './dto/user-preferences.dto';

@Injectable()
export class UserService {
  constructor(private readonly supabaseService: SupabaseService) {}

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
    
    return bookings;
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
    
    return booking;
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
}
