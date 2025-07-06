import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightSearchDto, TripType } from './dto/flight-search.dto';
import { Flight } from './interfaces/flight.interface';
import { CabinClass } from '../common/enums/cabin-class.enum';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiQuery,
  getSchemaPath 
} from '@nestjs/swagger';

@ApiTags('flights')
@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  /**
   * GET /flights/search
   * Search for available one-way or round-trip flights
   * Example: /flights/search?origin=CDG&destination=HKG&departureDate=2025-04-27&tripType=ONE_WAY&adults=1&children=0&infants=0&class=ECONOMY
   */
  @ApiOperation({ 
    summary: 'Search for available flights',
    description: 'Search for one-way or round-trip flights based on dates, locations, and passenger details'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of available flights matching the search criteria',
    schema: {
      type: 'object',
      properties: {
        flights: {
          type: 'array',
          items: { $ref: getSchemaPath(Flight) }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid search parameters' })
  @ApiQuery({ name: 'origin', example: 'CDG', required: true, description: 'Origin airport IATA code' })
  @ApiQuery({ name: 'destination', example: 'HKG', required: true, description: 'Destination airport IATA code' })
  @ApiQuery({ name: 'departureDate', example: '2025-04-27', required: true, description: 'Departure date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'returnDate', required: false, description: 'Return date in YYYY-MM-DD format (required for ROUND_TRIP)' })
  @ApiQuery({ name: 'tripType', enum: TripType, example: 'ONE_WAY', required: false, description: 'Trip type: ONE_WAY or ROUND_TRIP' })
  @ApiQuery({ name: 'adults', example: 1, required: false, description: 'Number of adults (1-9)', type: 'number' })
  @ApiQuery({ name: 'children', example: 0, required: false, description: 'Number of children (0-8)', type: 'number' })
  @ApiQuery({ name: 'infants', example: 0, required: false, description: 'Number of infants (0-4)', type: 'number' })
  @ApiQuery({ name: 'class', enum: CabinClass, example: 'ECONOMY', required: false, description: 'Cabin class' })
  @Get('search')
  @UsePipes(new ValidationPipe({ 
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
    forbidNonWhitelisted: false
  }))
  async searchFlights(
    @Query() searchDto: FlightSearchDto
  ): Promise<{ flights: Flight[] }> {
    const flights = await this.flightService.searchFlights(searchDto);
    return { flights };
  }
}
