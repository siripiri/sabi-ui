import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiServiceService } from '../api-services/api-service.service';
import { Location } from '../location/location.model';
import { Lorry } from '../lorry/lorry.model';
import { trips, tripsTable } from './trips.model';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(
    private apiService: ApiServiceService
  ) { }

  getAllTripTables(): Observable<tripsTable[]> {
    return this.apiService.getAllTripsTable();
  }

  getAllLocation(): Observable<Location[]> {
    return this.apiService.getAllLocationForTrip();
  }

  getAllLorry(): Observable<Lorry[]> {
    return this.apiService.getAllLorryForTrip();
  }

  saveTrip(trip : trips): Observable<trips> {
    return this.apiService.putTripDetail(trip);
  }
}
