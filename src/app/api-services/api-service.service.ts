import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Location, LocationApi } from '../location/location.model';
import { Driver, Lorry } from '../lorry/lorry.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private __http:HttpClient
  ) { }

  private GetLocationsUrl = "http://localhost:8080/api/v1/location";
  private PostLocationUrl = "http://localhost:8080/api/v1/location";
  private patchLocationUrl = "http://localhost:8080/api/v1/location";

  private GetLorryWithDriverNameUrl = "http://localhost:8080/api/v1/lorry/driverName";
  private GetDriversNameWithLorryIdUrl = "http://localhost:8080/api/v1/driver/names";
  private PutLorry = "http://localhost:8080/api/v1/lorry";
  private PatchLorryUrl = "http://localhost:8080/api/v1/lorry"
  private UnAssignDriver = "http://localhost:8080/api/v1/lorry/unassignDriver";
  private AssignDriverUrl = "http://localhost:8080/api/v1/lorry/assignDriver"

  getLocationData(): Observable<Location[]> {
    return this.__http.get<Location[]>(this.GetLocationsUrl);
  }

  putLocationData(location: LocationApi): Observable<Location> {
    return this.__http.put<Location>(this.PostLocationUrl, location);
  }

  patchLocationData(location: LocationApi, id: number): Observable<Location> {
    return this.__http.patch<Location>(this.patchLocationUrl + '/' + id, location);
  }

  getLorryData(): Observable<Lorry[]> {
    return this.__http.get<Lorry[]>(this.GetLorryWithDriverNameUrl);
  }

  getDriverNamesData(): Observable<Driver[]> {
    return this.__http.get<Driver[]>(this.GetDriversNameWithLorryIdUrl);
  }

  putLorry(lorry:any): Observable<any> {
    return this.__http.put<any>(this.PutLorry, lorry);
  }

  patchLorry(lorry: Lorry): Observable<Lorry> {
    return this.__http.patch<Lorry>(this.PatchLorryUrl, lorry);
  }

  unassignDriver(lorry: Lorry): Observable<Lorry> {
    return this.__http.put<Lorry>(this.UnAssignDriver, lorry);
  }

  assignDriver(lorry: Lorry): Observable<Lorry> {
    return this.__http.put<Lorry>(this.AssignDriverUrl, lorry);
  }
}
