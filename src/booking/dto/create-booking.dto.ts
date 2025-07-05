import {
  IsUUID,
  IsEnum,
  IsOptional,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CabinClass } from '../../common/enums/cabin-class.enum';
import { CreatePassengerDto } from '../../passenger/dto/create-passenger.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'UUID of the flight to book',
    example: '8a13a377-6131-47e5-8822-13f89e0dd898',
    format: 'uuid',
  })
  @IsUUID()
  flightId: string;

  @ApiProperty({
    description: 'UUID of the return flight (for round trips)',
    example: '7b24a388-7242-58e6-9933-24f90e0ee799',
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  returnFlightId?: string;

  @ApiProperty({
    description: 'Cabin class for the booking',
    enum: CabinClass,
    example: 'ECONOMY',
  })
  @IsEnum(CabinClass)
  cabinClass: CabinClass;

  @ApiProperty({
    description: 'List of passengers for the booking',
    type: [CreatePassengerDto],
    minItems: 1,
  })
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreatePassengerDto)
  passengers: CreatePassengerDto[];
}
