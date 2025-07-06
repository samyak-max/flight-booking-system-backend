import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CabinClass } from '../../common/enums/cabin-class.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Enum for supported trip types
 */
export enum TripType {
  ONE_WAY = 'ONE_WAY',
  ROUND_TRIP = 'ROUND_TRIP',
}

export class FlightSearchDto {
  /**
   * IATA code of origin airport (e.g., 'DEL')
   */
  @ApiProperty({
    example: 'LHR',
    description: 'IATA code of origin airport',
    pattern: '^[A-Z]{3}$'
  })
  @IsString()
  @Transform(({ value }) => typeof value === 'string' ? value.toUpperCase() : value)
  @Matches(/^[A-Z]{3}$/, { message: 'Origin must be a valid 3-letter IATA code' })
  origin: string;

  /**
   * IATA code of destination airport (e.g., 'JFK')
   */
  @ApiProperty({
    example: 'JFK',
    description: 'IATA code of destination airport',
    pattern: '^[A-Z]{3}$'
  })
  @IsString()
  @Transform(({ value }) => typeof value === 'string' ? value.toUpperCase() : value)
  @Matches(/^[A-Z]{3}$/, { message: 'Destination must be a valid 3-letter IATA code' })
  destination: string;

  /**
   * Date of departure in ISO format (e.g., 2025-07-04)
   */
  @ApiProperty({
    example: '2023-12-25',
    description: 'Date of departure in ISO format',
    type: 'string',
    format: 'date'
  })
  @IsDateString({}, { message: 'Invalid departure date format' })
  departureDate: string;

  /**
   * Return date (only used if tripType is ROUND_TRIP)
   */
  @ApiPropertyOptional({
    example: '2023-12-31',
    description: 'Return date (required if tripType is ROUND_TRIP)',
    type: 'string',
    format: 'date'
  })
  @IsOptional()
  @IsDateString({}, { message: 'Invalid return date format' })
  returnDate?: string;

  /**
   * Number of adults (1 to 9)
   */
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(9)
  adults: number = 1;

  /**
   * Number of children (0 to 8)
   */
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  @Max(8)
  children: number = 0;

  /**
   * Number of infants (0 to 4)
   */
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  @Max(4)
  infants: number = 0;

  /**
   * Cabin class (default: ECONOMY)
   */
  @ApiPropertyOptional({
    enum: CabinClass,
    enumName: 'CabinClass',
    description: 'Preferred cabin class',
    default: CabinClass.ECONOMY,
    example: CabinClass.ECONOMY
  })
  @IsOptional()
  @Transform(({ value }) => {
    // Handle string values from query parameters
    if (typeof value === 'string') {
      // Try to match with CabinClass enum values
      const normalized = value.toUpperCase();
      
      // Check if it matches any of the enum values directly
      if (Object.values(CabinClass).includes(normalized as CabinClass)) {
        return normalized;
      }
      
      // Handle common variants
      if (normalized === 'PREMIUM_ECONOMY' || normalized === 'PREMIUM-ECONOMY') {
        return CabinClass.PREMIUM;
      }
      
      // If not, use default
      return CabinClass.ECONOMY;
    }
    return value || CabinClass.ECONOMY;
  })
  @IsEnum(CabinClass, { message: 'Invalid cabin class' })
  class: CabinClass = CabinClass.ECONOMY;

  /**
   * Type of trip (default: ONE_WAY)
   */
  @ApiPropertyOptional({
    enum: TripType,
    enumName: 'TripType',
    description: 'Type of trip',
    default: TripType.ONE_WAY,
    example: TripType.ROUND_TRIP
  })
  @IsOptional()
  @Transform(({ value }) => {
    // Handle string values from query parameters
    if (typeof value === 'string') {
      const normalized = value.toUpperCase();
      const match = Object.values(TripType).find(v => v === normalized);
      return match || TripType.ONE_WAY;
    }
    return value || TripType.ONE_WAY;
  })
  @IsEnum(TripType, { message: 'Trip type must be ONE_WAY or ROUND_TRIP' })
  tripType: TripType = TripType.ONE_WAY;
}
