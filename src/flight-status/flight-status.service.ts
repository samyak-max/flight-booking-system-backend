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
      (payload) => {
        const updated = payload.new;
        const previous = payload.old;

        if (!updated || !updated.status) return;

        // Filter out 'SCHEDULED' or unchanged status updates
        if (
          updated.status !== 'SCHEDULED' &&
          (!previous || previous.status !== updated.status)
        ) {
          this.logger.log(`Flight status change detected: ${JSON.stringify(updated)}`);

          this.flightStatusSubject.next({
            flightId: updated.id,
            flightNumber: updated.flight_number,
            status: updated.status,
            updatedAt: new Date().toISOString(),
            message: this.getStatusMessage(updated.status, updated.flight_number),
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
          // Add proper SSE formatting for Postman and other clients
          id: update.flightId,
          type: 'message',
        };
      })
    );
  }

  // Get status updates for a specific flight
  getStatusUpdatesForFlight(flightId: string): Observable<any> {
  return this.flightStatusSubject.asObservable().pipe(
    // Filter to only updates for this flight
    filter((update) => update.flightId === flightId),

    // Format the update as SSE-compliant object
    map((update) => ({
      data: JSON.stringify(update),
      id: update.flightId,
      type: 'message',
    }))
  );
}

  // Update a flight's status
  async updateFlightStatus(
    flightId: string,
    status: FlightStatus,
    additionalInfo?: string
  ): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('flights')
        .update({ status, status_updated_at: new Date().toISOString() })
        .eq('id', flightId);

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

  // Get the current status of a flight
  async getCurrentFlightStatus(flightId: string): Promise<FlightStatusUpdateDto | null> {
    try {
      const { data, error } = await this.supabase
        .from('flights')
        .select('id, flight_number, status, status_updated_at')
        .eq('id', flightId)
        .single();

      if (error || !data) {
        this.logger.error(`Error fetching flight status: ${error?.message}`);
        return null;
      }

      return {
        flightId: data.id,
        flightNumber: data.flight_number,
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
