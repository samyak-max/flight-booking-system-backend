import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FlightStatus } from '../../common/enums/flight-status.enum';

export class UpdateFlightStatusDto {
  @ApiProperty({
    description: 'New status for the flight',
    enum: FlightStatus,
    example: FlightStatus.BOARDING,
  })
  @IsEnum(FlightStatus)
  status: FlightStatus;

  @ApiPropertyOptional({
    description: 'Additional information about the status update (e.g., reason for delay)',
    example: 'Due to weather conditions at the destination',
  })
  @IsOptional()
  @IsString()
  additionalInfo?: string;
}
