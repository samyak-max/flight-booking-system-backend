import { ApiProperty } from '@nestjs/swagger';
import { FlightStatus } from '../../common/enums/flight-status.enum';

export class Flight {
  @ApiProperty({
    example: 'BA123',
    description: 'Unique flight number',
  })
  flightNumber: string;
  
  @ApiProperty({
    enum: FlightStatus,
    example: FlightStatus.SCHEDULED,
    description: 'Current status of the flight',
  })
  status: FlightStatus;

  @ApiProperty({
    example: 'British Airways',
    description: 'Name of the airline operating the flight',
  })
  airline: string;

  @ApiProperty({
    example: 'LHR',
    description: '3-letter IATA code for origin airport',
  })
  origin: string;

  @ApiProperty({
    example: 'JFK',
    description: '3-letter IATA code for destination airport',
  })
  destination: string;

  @ApiProperty({
    example: '2023-12-25T08:30:00Z',
    description: 'Departure time in ISO format',
  })
  departureTime: string;

  @ApiProperty({
    example: '2023-12-25T16:45:00Z',
    description: 'Arrival time in ISO format',
  })
  arrivalTime: string;

  @ApiProperty({
    example: '8h 15m',
    description: 'Flight duration in hours and minutes',
  })
  duration: string;

  @ApiProperty({
    example: 299.99,
    description: 'Price of the flight in USD',
  })
  price: number;

  @ApiProperty({
    example: { ECONOMY: 120, BUSINESS: 20, FIRST: 5 },
    description: 'Available seats by cabin class',
    type: 'object',
    additionalProperties: { type: 'number' }
  })
  availableSeats: Record<string, number>;
}
