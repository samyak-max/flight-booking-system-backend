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
  @ApiProperty({
    example: 2,
    description: 'Number of adults (1 to 9)',
    minimum: 1,
    maximum: 9,
    default: 1,
    type: 'integer'
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(9)
  adults: number = 1;

  /**
   * Number of children (0 to 8)
   */
  @ApiPropertyOptional({
    example: 1,
    description: 'Number of children aged 2-11 (0 to 8)',
    minimum: 0,
    maximum: 8,
    default: 0,
    type: 'integer'
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  @Max(8)
  children: number = 0;

  /**
   * Number of infants (0 to 4)
   */
  @ApiPropertyOptional({
    example: 0,
    description: 'Number of infants under 2 years (0 to 4)',
    minimum: 0,
    maximum: 4,
    default: 0,
    type: 'integer'
  })
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
  @IsEnum(TripType, { message: 'Trip type must be ONE_WAY or ROUND_TRIP' })
  tripType: TripType = TripType.ONE_WAY;
}
