import { Controller, Get, Param, Post, Body, Sse, UseGuards } from '@nestjs/common';
import { FlightStatusService } from './flight-status.service';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { FlightStatusUpdateDto } from './dto/flight-status-update.dto';
import { UpdateFlightStatusDto } from './dto/update-flight-status.dto';
import { FlightStatus } from '../common/enums/flight-status.enum';

@ApiTags('flight-status')
@Controller('flight-status')
export class FlightStatusController {
  constructor(private readonly flightStatusService: FlightStatusService) {}

  @ApiOperation({ summary: 'Subscribe to all flight status updates' })
  @ApiResponse({
    status: 200,
    description: 'Server-sent events stream of flight status updates',
  })
  @Sse('updates')
  getStatusUpdates(): Observable<any> {
    return this.flightStatusService.getStatusUpdates();
  }

  @ApiOperation({ summary: 'Subscribe to status updates for a specific flight' })
  @ApiParam({
    name: 'flightId',
    description: 'UUID of the flight to get status updates for',
    example: '8a13a377-6131-47e5-8822-13f89e0dd898',
  })
  @ApiResponse({
    status: 200,
    description: 'Server-sent events stream of status updates for the specified flight',
  })
  @Sse('updates/:flightId')
  getStatusUpdatesForFlight(@Param('flightId') flightId: string): Observable<any> {
    return this.flightStatusService.getStatusUpdatesForFlight(flightId);
  }

  @ApiOperation({ summary: 'Get current status of a specific flight' })
  @ApiParam({
    name: 'flightId',
    description: 'UUID of the flight to get current status for',
    example: '8a13a377-6131-47e5-8822-13f89e0dd898',
  })
  @ApiResponse({
    status: 200,
    description: 'Current status of the flight',
    type: FlightStatusUpdateDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Flight not found',
  })
  @Get(':flightId')
  async getCurrentStatus(@Param('flightId') flightId: string): Promise<FlightStatusUpdateDto> {
    const status = await this.flightStatusService.getCurrentFlightStatus(flightId);
    if (!status) {
      throw new Error('Flight not found');
    }
    return status;
  }

  @ApiOperation({ summary: 'Update the status of a flight (admin only)' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'flightId',
    description: 'UUID of the flight to update',
    example: '8a13a377-6131-47e5-8822-13f89e0dd898',
  })
  @ApiBody({ type: UpdateFlightStatusDto })
  @ApiResponse({
    status: 200,
    description: 'Flight status updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - authentication required',
  })
  @Post(':flightId/status')
  @UseGuards(JwtAuthGuard)
  async updateFlightStatus(
    @Param('flightId') flightId: string,
    @Body() updateDto: UpdateFlightStatusDto
  ): Promise<{ success: boolean; message: string }> {
    const success = await this.flightStatusService.updateFlightStatus(
      flightId,
      updateDto.status,
      updateDto.additionalInfo
    );

    return {
      success,
      message: success
        ? `Flight status updated to ${updateDto.status}`
        : 'Failed to update flight status',
    };
  }
}
