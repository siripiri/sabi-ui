import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location, LocationApi } from '../location/location.model';
import { DriverName, Lorry, LorryTable } from '../lorry/lorry.model';

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

  private PutLorryWithDriverUrl = "http://localhost:8080/api/v1/lorry/lorryDriver";
  private PutLorryWithoutDriverUrl = "http://localhost:8080/api/v1/lorry";

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

  getDriverNamesData(): Observable<DriverName[]> {
    return this.__http.get<DriverName[]>(this.GetDriversNameWithLorryIdUrl);
  }

  putLorryWithDriver(lorry: any): Observable<any> {
    return this.__http.put<any>(this.PutLorryWithDriverUrl, lorry);
  }

  putLorryWithoutDriver(lorry:any): Observable<any> {
    return this.__http.put<any>(this.PutLorryWithoutDriverUrl, lorry);
  }
}
