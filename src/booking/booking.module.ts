import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import { PassengerModule } from '../passenger/passenger.module';
import { TicketModule } from '../ticket/ticket.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SupabaseModule, PassengerModule, TicketModule, AuthModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
