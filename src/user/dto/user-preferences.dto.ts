import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CabinClass } from '../../common/enums/cabin-class.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserPreferencesDto {
  @ApiProperty({
    enum: CabinClass,
    description: 'User\'s preferred cabin class for flights',
    required: false,
    example: 'ECONOMY'
  })
  @IsOptional()
  @IsEnum(CabinClass)
  preferredCabinClass?: CabinClass;

  @ApiProperty({
    description: 'List of IATA codes for user\'s favorite airports',
    required: false,
    example: ['JFK', 'LHR', 'CDG'],
    type: [String]
  })
  @IsOptional()
  @IsString({ each: true })
  favoriteAirports?: string[];

  @ApiProperty({
    description: 'User\'s preferred airlines',
    required: false,
    example: ['Emirates', 'British Airways', 'Lufthansa'],
    type: [String]
  })
  @IsOptional()
  @IsString({ each: true })
  preferredAirlines?: string[];

  @ApiProperty({
    description: 'User\'s meal preferences for flights',
    required: false,
    example: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      kosher: false,
      halal: false
    }
  })
  @IsOptional()
  mealPreferences?: {
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
    kosher?: boolean;
    halal?: boolean;
  };

  @ApiProperty({
    description: 'User\'s seat preferences for flights',
    required: false,
    example: {
      preferWindow: true,
      preferAisle: false,
      preferExtraLegroom: true
    }
  })
  @IsOptional()
  seatPreferences?: {
    preferWindow?: boolean;
    preferAisle?: boolean;
    preferExtraLegroom?: boolean;
  };
}
