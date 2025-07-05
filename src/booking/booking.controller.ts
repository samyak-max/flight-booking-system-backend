import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('bookings')
@ApiBearerAuth()
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Booking has been successfully created',
    schema: {
      type: 'object',
      properties: {
        booking: { type: 'object' },
        passengers: { type: 'array', items: { type: 'object' } },
        tickets: { type: 'array', items: { type: 'object' } },
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid booking data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - authentication required' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createBooking(@Req() req, @Body() createBookingDto: CreateBookingDto) {
    const userId = req.user.id;
    return this.bookingService.createBooking(userId, createBookingDto);
  }
}
