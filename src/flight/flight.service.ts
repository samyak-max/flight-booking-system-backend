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

    const cacheKey = `internal-flights:${JSON.stringify(searchDto)}`;
    const cached = await this.cacheManager.get<Flight[]>(cacheKey);
    if (cached) return cached;

    const supabase = this.supabaseService.getClient();

    // Fetch airport IDs based on IATA codes
    const { data: airports } = await supabase
      .from('airports')
      .select('id, code, name');

    const originAirport = airports?.find((a) => a.code === origin);
    const destinationAirport = airports?.find((a) => a.code === destination);

    if (!originAirport || !destinationAirport) {
      throw new BadRequestException('Invalid origin or destination IATA code');
    }

    // Format departure date range in UTC
    const departureStart = new Date(`${departureDate}T00:00:00.000Z`);
    const departureEnd = new Date(`${departureDate}T23:59:59.999Z`);

    // Query outbound flights
    const { data: outboundFlightsRaw } = await supabase
      .from('flights')
      .select('*')
      .eq('origin_id', originAirport.id)
      .eq('destination_id', destinationAirport.id)
      .gte('departure_time', departureStart.toISOString())
      .lte('departure_time', departureEnd.toISOString());

    const outboundFlights = (outboundFlightsRaw || []).filter((flight) => {
      const seats = flight.available_seats?.[cabinClass];
      return typeof seats === 'number' && seats >= totalPassengers;
    });

    let returnFlights: any[] = [];

    if (tripType === TripType.ROUND_TRIP && returnDate) {
      const returnStart = new Date(`${returnDate}T00:00:00.000Z`);
      const returnEnd = new Date(`${returnDate}T23:59:59.999Z`);

      const { data: returnFlightsRaw } = await supabase
        .from('flights')
        .select('*')
        .eq('origin_id', destinationAirport.id)
        .eq('destination_id', originAirport.id)
        .gte('departure_time', returnStart.toISOString())
        .lte('departure_time', returnEnd.toISOString());

      returnFlights = (returnFlightsRaw || []).filter((flight) => {
        const seats = flight.available_seats?.[cabinClass];
        return typeof seats === 'number' && seats >= totalPassengers;
      });
    }

    const allFlights = [...outboundFlights, ...returnFlights];
    const results = allFlights.map((flight) =>
      this.mapToFlightEntity(flight, airports ?? [])
    );

    await this.cacheManager.set(cacheKey, results, 900);

    return results;
  }

  private mapToFlightEntity(flight: any, airports: any[]): Flight {
    const origin = airports.find((a) => a.id === flight.origin_id);
    const destination = airports.find((a) => a.id === flight.destination_id);

    return {
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
