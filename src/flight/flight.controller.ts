import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightSearchDto } from './dto/flight-search.dto';
import { Flight } from './interfaces/flight.interface';
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
   */
  @ApiOperation({ 
    summary: 'Search for available flights',
    description: 'Search for one-way or round-trip flights based on dates, locations, and passenger details'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of available flights matching the search criteria',
    type: [Flight]
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid search parameters' })
  @Get('search')
  @UsePipes(new ValidationPipe({ transform: true }))
  async searchFlights(
    @Query() searchDto: FlightSearchDto
  ): Promise<Flight[]> {
    return this.flightService.searchFlights(searchDto);
  }
}
