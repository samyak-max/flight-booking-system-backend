import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { v4 as uuidv4 } from 'uuid';
import { PassengerService } from '../passenger/passenger.service';
import { TicketService } from '../ticket/ticket.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly passengerService: PassengerService,
    private readonly ticketService: TicketService,
  ) {}

  async createBooking(userId: string, dto: CreateBookingDto) {
    const supabase = this.supabaseService.getClient();

    const {
      flightId,
      returnFlightId,
      cabinClass,
      passengers
    } = dto;

    const totalPassengers = passengers.length;

    // Validate flights and seats
    const flightIds = [flightId, returnFlightId].filter(Boolean);
    const { data: flights, error: flightError } = await supabase
      .from('flights')
      .select('*')
      .in('id', flightIds);

    if (flightError || flights.length !== flightIds.length) {
      throw new BadRequestException('Invalid flight selection.');
    }

    for (const flight of flights) {
      const available = flight.available_seats?.[cabinClass];
      if (!available || available < totalPassengers) {
        throw new BadRequestException(`Not enough seats on flight ${flight.flight_number}`);
      }
    }

    const totalPrice = flights.reduce((sum, flight) => sum + flight.price, 0) * totalPassengers;

    const bookingRef = `BOOK-${uuidv4().split('-')[0].toUpperCase()}`;

    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        user_id: userId,
        flight_id: flightId,
        return_flight_id: returnFlightId || null,
        booking_reference: bookingRef,
        total_price: totalPrice,
        cabin_class: cabinClass,
        passenger_count: totalPassengers,
      })
      .select()
      .single();

    if (bookingError) {
      console.error('Booking creation error:', bookingError);
      throw new BadRequestException(`Failed to create booking: ${bookingError.message || JSON.stringify(bookingError)}`);
    }

    // Create passengers
    const createdPassengers = await this.passengerService.createPassengers({
      bookingId: bookingData.id,
      passengers,
    });

    // Create tickets for those passengers
    const tickets = await this.ticketService.createTickets({
      bookingId: bookingData.id,
      passengers: createdPassengers,
    });

    return {
      booking: bookingData,
      passengers: createdPassengers,
      tickets,
    };
  }
}
