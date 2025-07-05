import { ApiProperty } from '@nestjs/swagger';
import { FlightStatus } from '../../common/enums/flight-status.enum';

export class FlightStatusUpdateDto {
  @ApiProperty({
    description: 'UUID of the flight',
    example: '8a13a377-6131-47e5-8822-13f89e0dd898',
  })
  flightId: string;

  @ApiProperty({
    description: 'Flight number',
    example: 'BA123',
  })
  flightNumber: string;

  @ApiProperty({
    description: 'Current status of the flight',
    enum: FlightStatus,
    example: FlightStatus.BOARDING,
  })
  status: FlightStatus;

  @ApiProperty({
    description: 'Timestamp when the status was updated',
    example: '2025-07-05T15:30:45Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Human-readable message about the status update',
    example: 'Flight BA123 is now boarding. Please proceed to the gate.',
  })
  message: string;
}
