import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { CacheModule } from '@nestjs/cache-manager';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 900,
      isGlobal: true,
    }),
    SupabaseModule,
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
