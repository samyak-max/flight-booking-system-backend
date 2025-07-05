import { Controller, Get, Param } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('tickets')
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({ summary: 'Get tickets by booking ID' })
  @ApiParam({
    name: 'bookingId',
    type: 'string',
    format: 'uuid',
    description: 'The UUID of the booking',
    example: '8a13a377-6131-47e5-8822-13f89e0dd898'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Tickets have been successfully retrieved',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          booking_id: { type: 'string', format: 'uuid' },
          passenger_id: { type: 'string', format: 'uuid' },
          e_ticket_number: { type: 'string' }
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @Get(':bookingId')
  async getTicketByBookingId(@Param('bookingId') bookingId: string) {
    return this.ticketService.getTicketsByBookingId(bookingId);
  }
}
