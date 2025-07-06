import { ApiProperty } from '@nestjs/swagger';
import { FlightStatus } from '../../common/enums/flight-status.enum';

export class FlightStatusUpdateDto {
  @ApiProperty({
    description: 'Internal ID of the flight (not used for queries)',
    example: '8a13a377-6131-47e5-8822-13f89e0dd898',
  })
  flightId: string;

  @ApiProperty({
    description: 'Flight number (primary identifier used for queries)',
    example: 'BA123',
  })
  flightNumber: string;

  @ApiProperty({
    description: 'Airline name',
    example: 'British Airways',
  })
  airline: string;

  @ApiProperty({
    description: 'Origin airport ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  originId: string;

  @ApiProperty({
    description: 'Destination airport ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  destinationId: string;

  @ApiProperty({
    description: 'Scheduled departure time',
    example: '2025-07-06T10:30:00Z',
  })
  departureTime: string;

  @ApiProperty({
    description: 'Scheduled arrival time',
    example: '2025-07-06T12:45:00Z',
  })
  arrivalTime: string;

  @ApiProperty({
    description: 'Flight duration in ISO 8601 duration format',
    example: 'PT2H15M',
  })
  duration: string;

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
