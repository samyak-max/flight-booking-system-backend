import { IsString, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';
import { PassengerType } from '../../common/enums/passenger-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePassengerDto {
  @ApiProperty({
    description: 'Full name of the passenger',
    example: 'John Doe',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Date of birth in ISO format (YYYY-MM-DD)',
    example: '1990-01-15',
    type: String,
  })
  @IsDateString()
  dob: string;

  @ApiProperty({
    description: 'Nationality of the passenger',
    example: 'American',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  nationality: string;

  @ApiProperty({
    description: 'Passport number of the passenger',
    example: 'A12345678',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  passportNumber: string;

  @ApiProperty({
    description: 'Type of passenger',
    enum: PassengerType,
    example: 'ADULT',
  })
  @IsEnum(PassengerType)
  type: PassengerType;
}

