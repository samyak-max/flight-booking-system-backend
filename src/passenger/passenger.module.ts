import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [PassengerService],
  exports: [PassengerService],
})
export class PassengerModule {}
