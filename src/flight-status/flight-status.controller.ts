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

  @ApiOperation({ summary: 'Subscribe to all flight status updates with complete flight details' })
  @ApiResponse({
    status: 200,
    description: 'Server-sent events stream of flight status updates with complete flight details',
  })
  @Sse('updates')
  getStatusUpdates(): Observable<any> {
    return this.flightStatusService.getStatusUpdates();
  }

  @ApiOperation({ summary: 'Subscribe to status updates for a specific flight with complete flight details' })
  @ApiParam({
    name: 'flightNumber',
    description: 'Flight number to get status updates for',
    example: 'BA123',
  })
  @ApiResponse({
    status: 200,
    description: 'Server-sent events stream of status updates with complete flight details for the specified flight',
  })
  @Sse('updates/:flightNumber')
  getStatusUpdatesForFlight(@Param('flightNumber') flightNumber: string): Observable<any> {
    return this.flightStatusService.getStatusUpdatesForFlight(flightNumber);
  }

  @ApiOperation({ summary: 'Get current status of a specific flight with complete flight details' })
  @ApiParam({
    name: 'flightNumber',
    description: 'Flight number to get current status for',
    example: 'BA123',
  })
  @ApiResponse({
    status: 200,
    description: 'Current status and complete flight details',
    type: FlightStatusUpdateDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Flight not found',
  })
  @Get(':flightNumber')
  async getCurrentStatus(@Param('flightNumber') flightNumber: string): Promise<FlightStatusUpdateDto> {
    const status = await this.flightStatusService.getCurrentFlightStatus(flightNumber);
    if (!status) {
      throw new Error('Flight not found');
    }
    return status;
  }

  @ApiOperation({ summary: 'Update the status of a flight (admin only)' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'flightNumber',
    description: 'Flight number to update',
    example: 'BA123',
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
  @Post(':flightNumber/status')
  @UseGuards(JwtAuthGuard)
  async updateFlightStatus(
    @Param('flightNumber') flightNumber: string,
    @Body() updateDto: UpdateFlightStatusDto
  ): Promise<{ success: boolean; message: string }> {
    const success = await this.flightStatusService.updateFlightStatus(
      flightNumber,
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
