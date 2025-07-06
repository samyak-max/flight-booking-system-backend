import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SupabaseService } from '../supabase/supabase.service';
import { FlightSearchDto, TripType } from './dto/flight-search.dto';
import { Flight } from './interfaces/flight.interface';

@Injectable()
export class FlightService {
  constructor(
    private readonly supabaseService: SupabaseService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async searchFlights(searchDto: FlightSearchDto): Promise<Flight[]> {
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      tripType,
      adults,
      children = 0,
      infants = 0,
      class: cabinClass,
    } = searchDto;
    
    const totalPassengers = adults + children + infants;

    if (tripType === TripType.ROUND_TRIP && !returnDate) {
      throw new BadRequestException('Return date is required for round-trip flights');
    }

    // Generate a unique cache key
    const cacheKey = `internal-flights:${JSON.stringify({
      origin, destination, departureDate, returnDate, tripType, adults, children, infants, cabinClass
    })}`;
    
    // Try to get from cache first
    const cached = await this.cacheManager.get<Flight[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const supabase = this.supabaseService.getClient();

    // Fetch airport IDs based on IATA codes
    const { data: airports } = await supabase
      .from('airports')
      .select('id, code, name');

    const originAirport = airports?.find((a) => a.code.toUpperCase() === origin.toUpperCase());
    const destinationAirport = airports?.find((a) => a.code.toUpperCase() === destination.toUpperCase());

    if (!originAirport || !destinationAirport) {
      throw new BadRequestException('Invalid origin or destination IATA code');
    }

    // Format departure date range in UTC
    const departureStart = new Date(`${departureDate}T00:00:00.000Z`);
    const departureEnd = new Date(`${departureDate}T23:59:59.999Z`);

    // Query outbound flights
    const { data: outboundFlightsRaw, error: outboundError } = await supabase
      .from('flights')
      .select('*')
      .eq('origin_id', originAirport.id)
      .eq('destination_id', destinationAirport.id)
      .gte('departure_time', departureStart.toISOString())
      .lte('departure_time', departureEnd.toISOString());
    
    if (outboundError) {
      throw new BadRequestException('Error searching for flights');
    }
    
    // Make sure we have a valid cabin class string to use as a key
    const cabinClassKey = typeof cabinClass === 'string' 
      ? cabinClass.toUpperCase() 
      : 'ECONOMY';

    const outboundFlights = (outboundFlightsRaw || []).filter((flight) => {
      // Check if available_seats exists
      if (!flight.available_seats) {
        return false;
      }
      
      // Try to find a matching cabin class by checking all keys case-insensitively
      let seats = null;
      const cabinKeys = Object.keys(flight.available_seats || {});
      
      // First check for exact match
      for (const key of cabinKeys) {
        if (key.toUpperCase() === cabinClassKey) {
          seats = flight.available_seats[key];
          break;
        }
      }
      
      // If no exact match, handle common variants (PREMIUM vs PREMIUM_ECONOMY)
      if (seats === null) {
        if (cabinClassKey === 'PREMIUM_ECONOMY' && cabinKeys.includes('PREMIUM')) {
          seats = flight.available_seats['PREMIUM'];
        } else if (cabinClassKey === 'PREMIUM' && cabinKeys.includes('PREMIUM_ECONOMY')) {
          seats = flight.available_seats['PREMIUM_ECONOMY'];
        }
      }
      
      if (seats === null) {
        return false;
      }
      
      return typeof seats === 'number' && seats >= totalPassengers;
    });

    let returnFlights: any[] = [];

    if (tripType === TripType.ROUND_TRIP && returnDate) {
      const returnStart = new Date(`${returnDate}T00:00:00.000Z`);
      const returnEnd = new Date(`${returnDate}T23:59:59.999Z`);

      const { data: returnFlightsRaw, error: returnError } = await supabase
        .from('flights')
        .select('*')
        .eq('origin_id', destinationAirport.id)
        .eq('destination_id', originAirport.id)
        .gte('departure_time', returnStart.toISOString())
        .lte('departure_time', returnEnd.toISOString());
        
      if (returnError) {
        throw new BadRequestException('Error searching for return flights');
      }

      returnFlights = (returnFlightsRaw || []).filter((flight) => {
        // Check if available_seats exists
        if (!flight.available_seats) {
          return false;
        }
        
        // Try to find a matching cabin class by checking all keys case-insensitively
        let seats = null;
        const cabinKeys = Object.keys(flight.available_seats || {});
        
        // First check for exact match
        for (const key of cabinKeys) {
          if (key.toUpperCase() === cabinClassKey) {
            seats = flight.available_seats[key];
            break;
          }
        }
        
        // If no exact match, handle common variants (PREMIUM vs PREMIUM_ECONOMY)
        if (seats === null) {
          if (cabinClassKey === 'PREMIUM_ECONOMY' && cabinKeys.includes('PREMIUM')) {
            seats = flight.available_seats['PREMIUM'];
          } else if (cabinClassKey === 'PREMIUM' && cabinKeys.includes('PREMIUM_ECONOMY')) {
            seats = flight.available_seats['PREMIUM_ECONOMY'];
          }
        }
        
        if (seats === null) {
          return false;
        }
        
        return typeof seats === 'number' && seats >= totalPassengers;
      });
    }

    const allFlights = [...outboundFlights, ...returnFlights];
    
    const results = allFlights.map((flight) =>
      this.mapToFlightEntity(flight, airports ?? [])
    );

    // Cache the results for 15 minutes
    await this.cacheManager.set(cacheKey, results, 900);
    
    return results;
  }

  private mapToFlightEntity(flight: any, airports: any[]): Flight {
    const origin = airports.find((a) => a.id === flight.origin_id);
    const destination = airports.find((a) => a.id === flight.destination_id);

    return {
      id: flight.id,
      flightNumber: flight.flight_number,
      airline: flight.airline,
      origin: origin?.code || 'UNKNOWN',
      destination: destination?.code || 'UNKNOWN',
      departureTime: flight.departure_time,
      arrivalTime: flight.arrival_time,
      duration: flight.duration,
      price: flight.price,
      availableSeats: flight.available_seats,
      status: flight.status,
    };
  }
}
