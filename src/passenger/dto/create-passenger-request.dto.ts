import { CreatePassengerDto } from './create-passenger.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePassengersRequestDto {
  @ApiProperty({
    description: 'UUID of the booking',
    example: '8a13a377-6131-47e5-8822-13f89e0dd898',
    format: 'uuid'
  })
  @IsUUID()
  bookingId: string;

  @ApiProperty({
    description: 'List of passengers for the booking',
    type: [CreatePassengerDto],
    minItems: 1
  })
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreatePassengerDto)
  passengers: CreatePassengerDto[];
}
