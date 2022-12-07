import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiServiceService } from '../api-services/api-service.service';
import { Address, Location, LocationApi, LocationTable } from './location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private __route: Router,
    private apiService: ApiServiceService
  ) { }

  putLocation(location:LocationApi): Observable<Location>{
    return this.apiService.putLocationData(location);
  }

  patchLocation(location:LocationApi, id:number): Observable<Location>{
    return this.apiService.patchLocationData(location, id);
  }

  getLocationDataTable(): Observable<LocationTable[]> {
    return this.apiService.getLocationData()
      .pipe(
        map(locations => {
          let locationTables: LocationTable[] = [];
          locations.forEach(location => {
            locationTables.push(this.locationToLocationTable(location));
          })
          return locationTables;
        })
      );
  }

  locationToLocationTable(location: Location): LocationTable {
    return {
      id: location.id,
      distributorName: location.distributorName,
      address: location.address.address,
      city: location.address.city,
      state: location.address.state,
      zipcode: location.address.zipcode,
      kmAllocated: location.kmAllocated
    };
  }

  formToLocationApi(location: any): LocationApi {
    return {
      distributorName: location.distributorName,
      address: this.formToAddress(location),
      kmAllocated: location.kmAllocated
    };
  }

  formToAddress(address: any): Address {
    return {
      address: address.address,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode
    }
  }
}
