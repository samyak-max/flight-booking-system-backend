import { Controller, Get, Post, Body, Param, Put, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { UserPreferencesDto } from './dto/user-preferences.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user profile information' })
  @ApiResponse({ 
    status: 200, 
    description: 'User profile data returned successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        // Add other profile properties
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - authentication required' })
  @Get('profile')
  async getUserProfile(@Req() req) {
    return this.userService.getUserProfile(req.user.id);
  }

  @ApiOperation({ summary: 'Update user preferences' })
  @ApiBody({ type: UserPreferencesDto })
  @ApiResponse({ 
    status: 200, 
    description: 'User preferences updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        preferences: { type: 'object' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid preferences data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - authentication required' })
  @Put('preferences')
  async updatePreferences(@Req() req, @Body() preferencesDto: UserPreferencesDto) {
    return this.userService.updateUserPreferences(req.user.id, preferencesDto);
  }

  @ApiOperation({ summary: 'Get user bookings history' })
  @ApiResponse({ 
    status: 200, 
    description: 'User bookings returned successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
          status: { type: 'string' },
          // Add other booking properties
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - authentication required' })
  @Get('bookings')
  async getUserBookings(@Req() req) {
    return this.userService.getUserBookings(req.user.id);
  }

  @ApiOperation({ summary: 'Get detailed information about a specific booking' })
  @ApiParam({
    name: 'bookingId',
    description: 'The ID of the booking to retrieve',
    required: true,
    type: 'string'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Booking details returned successfully',
    schema: {
      type: 'object',
      properties: {
        booking: { type: 'object' },
        passengers: { type: 'array', items: { type: 'object' } },
        tickets: { type: 'array', items: { type: 'object' } }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - authentication required' })
  @ApiResponse({ status: 404, description: 'Booking not found or does not belong to the user' })
  @Get('bookings/:bookingId')
  async getBookingDetails(@Req() req, @Param('bookingId') bookingId: string) {
    return this.userService.getBookingDetails(req.user.id, bookingId);
  }

  @ApiOperation({ summary: 'Cancel a booking' })
  @ApiParam({
    name: 'bookingId',
    description: 'The ID of the booking to cancel',
    required: true,
    type: 'string'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Booking has been successfully cancelled',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        refundAmount: { type: 'number' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - authentication required' })
  @ApiResponse({ status: 404, description: 'Booking not found or does not belong to the user' })
  @ApiResponse({ status: 400, description: 'Cannot cancel booking - already departed or cancelled' })
  @Post('bookings/:bookingId/cancel')
  async cancelBooking(@Req() req, @Param('bookingId') bookingId: string) {
    return this.userService.cancelBooking(req.user.id, bookingId);
  }
}
