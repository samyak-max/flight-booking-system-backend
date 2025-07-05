import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePassengersRequestDto } from './dto/create-passenger-request.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PassengerService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createPassengers(input: CreatePassengersRequestDto) {
    const supabase = this.supabaseService.getClient();

    const passengers = input.passengers.map((p) => ({
      id: uuidv4(),
      booking_id: input.bookingId,
      full_name: p.fullName,
      dob: p.dob,
      nationality: p.nationality,
      passport_number: p.passportNumber,
      type: p.type,
    }));

    const { data, error } = await supabase
      .from('passengers')
      .insert(passengers)
      .select();

    if (error) {
      console.error('Passenger creation error:', error);
      throw new Error(`Failed to create passengers: ${error.message || JSON.stringify(error)}`);
    }

    return data;
  }
}
