import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Observable, Subject, fromEvent, map, filter } from 'rxjs';
import { FlightStatus } from '../common/enums/flight-status.enum';
import { FlightStatusUpdateDto } from './dto/flight-status-update.dto';

@Injectable()
export class FlightStatusService implements OnModuleInit {
  private readonly logger = new Logger(FlightStatusService.name);
  private flightStatusSubject = new Subject<FlightStatusUpdateDto>();
  private supabase;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }

  onModuleInit() {
  this.supabase
    .channel('flights-status-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'flights',
      },
      async (payload) => {
        const updated = payload.new;
        const previous = payload.old;

        if (!updated || !updated.status) return;

        // Filter out 'SCHEDULED' or unchanged status updates
        if (
          updated.status !== 'SCHEDULED' &&
          (!previous || previous.status !== updated.status)
        ) {
          this.logger.log(`Flight status change detected: ${JSON.stringify(updated)}`);

          // Get complete flight information
          const { data: flightData, error } = await this.supabase
            .from('flights')
            .select('id, flight_number, airline, origin_id, destination_id, departure_time, arrival_time, duration, status, status_updated_at')
            .eq('id', updated.id)
            .single();

          if (error || !flightData) {
            this.logger.error(`Error fetching complete flight data: ${error?.message}`);
            return;
          }

          this.flightStatusSubject.next({
            flightId: flightData.id,
            flightNumber: flightData.flight_number,
            airline: flightData.airline,
            originId: flightData.origin_id,
            destinationId: flightData.destination_id,
            departureTime: flightData.departure_time,
            arrivalTime: flightData.arrival_time,
            duration: flightData.duration,
            status: flightData.status,
            updatedAt: flightData.status_updated_at || new Date().toISOString(),
            message: this.getStatusMessage(flightData.status, flightData.flight_number),
          });
        }
      }
    )
    .subscribe((status) => {
      this.logger.log(`Subscribed to flight updates: ${status}`);
    });
    }


  // SSE stream for flight status updates
  getStatusUpdates(): Observable<any> {
    return this.flightStatusSubject.asObservable().pipe(
      map((update) => {
        const data = JSON.stringify(update);
        return {
          data,
          // Use flight_number as the event ID
          id: update.flightNumber,
          type: 'message',
        };
      })
    );
  }

  // Get status updates for a specific flight
  getStatusUpdatesForFlight(flightNumber: string): Observable<any> {
  return this.flightStatusSubject.asObservable().pipe(
    // Filter to only updates for this flight by flight number
    filter((update) => update.flightNumber === flightNumber),

    // Format the update as SSE-compliant object
    map((update) => ({
      data: JSON.stringify(update),
      id: update.flightNumber,
      type: 'message',
    }))
  );
}

  // Update a flight's status by flight number instead of ID
  async updateFlightStatus(
    flightNumber: string,
    status: FlightStatus,
    additionalInfo?: string
  ): Promise<boolean> {
    try {
      // First, verify the flight exists
      const { data: flight, error: findError } = await this.supabase
        .from('flights')
        .select('id')
        .eq('flight_number', flightNumber)
        .single();

      if (findError || !flight) {
        this.logger.error(`Flight not found with number: ${flightNumber}`);
        return false;
      }

      const { error } = await this.supabase
        .from('flights')
        .update({ status, status_updated_at: new Date().toISOString() })
        .eq('flight_number', flightNumber);

      if (error) {
        this.logger.error(`Error updating flight status: ${error.message}`);
        return false;
      }

      return true;
    } catch (error) {
      this.logger.error(`Exception updating flight status: ${error.message}`);
      return false;
    }
  }

  // Get a human-readable message for each status
  private getStatusMessage(status: FlightStatus, flightNumber: string): string {
    switch (status) {
      case FlightStatus.BOARDING:
        return `Flight ${flightNumber} is now boarding. Please proceed to the gate.`;
      case FlightStatus.DEPARTED:
        return `Flight ${flightNumber} has departed.`;
      case FlightStatus.IN_AIR:
        return `Flight ${flightNumber} is now in the air.`;
      case FlightStatus.LANDED:
        return `Flight ${flightNumber} has landed at its destination.`;
      case FlightStatus.DELAYED:
        return `Flight ${flightNumber} has been delayed. Please check with the airline for more information.`;
      case FlightStatus.CANCELLED:
        return `Flight ${flightNumber} has been cancelled. Please contact the airline for rebooking options.`;
      default:
        return `Flight ${flightNumber} status has been updated to ${status}.`;
    }
  }

  // Get the current status of a flight by flight number
  async getCurrentFlightStatus(flightNumber: string): Promise<FlightStatusUpdateDto | null> {
    try {
      const { data, error } = await this.supabase
        .from('flights')
        .select('id, flight_number, airline, origin_id, destination_id, departure_time, arrival_time, duration, status, status_updated_at')
        .eq('flight_number', flightNumber)
        .single();

      if (error || !data) {
        this.logger.error(`Error fetching flight status: ${error?.message}`);
        return null;
      }

      return {
        flightId: data.id,
        flightNumber: data.flight_number,
        airline: data.airline,
        originId: data.origin_id,
        destinationId: data.destination_id,
        departureTime: data.departure_time,
        arrivalTime: data.arrival_time,
        duration: data.duration,
        status: data.status,
        updatedAt: data.status_updated_at,
        message: this.getStatusMessage(data.status, data.flight_number),
      };
    } catch (error) {
      this.logger.error(`Exception fetching flight status: ${error.message}`);
      return null;
    }
  }
}
