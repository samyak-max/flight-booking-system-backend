import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { TicketController } from './ticket.controller';

@Module({
  imports: [SupabaseModule],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
