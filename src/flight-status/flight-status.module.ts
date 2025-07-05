import { Module } from '@nestjs/common';
import { FlightStatusController } from './flight-status.controller';
import { FlightStatusService } from './flight-status.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [FlightStatusController],
  providers: [FlightStatusService],
  exports: [FlightStatusService],
})
export class FlightStatusModule {}
