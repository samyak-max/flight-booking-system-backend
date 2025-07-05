import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateTicketsRequestDto } from './dto/create-ticket-request.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TicketService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createTickets(input: CreateTicketsRequestDto) {
    const supabase = this.supabaseService.getClient();

    const tickets = input.passengers.map((passenger) => ({
      id: uuidv4(),
      booking_id: input.bookingId,
      passenger_id: passenger.id,
      e_ticket_number: `TKT-${uuidv4().split('-')[0].toUpperCase()}`,
    }));

    const { data, error } = await supabase.from('tickets').insert(tickets).select();

    if (error) {
      throw new Error('Failed to create tickets');
    }

    return data;
  }

  async getTicketsByBookingId(bookingId: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('booking_id', bookingId);

    if (error) {
      throw new Error(`Failed to get tickets for booking ID: ${bookingId}`);
    }

    return data;
  }
}
