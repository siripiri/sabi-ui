import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken, RegisterUser, User } from '../auth/auth.model';
import { Driver, DriverForm } from '../driver/driver.model';
import { Expenses, ExpensesCategory, FuelExpenses } from '../expenses/expenses.model';
import { cylinder } from '../loads/loads-model';
import { Location, LocationApi } from '../location/location.model';
import { Lorry } from '../lorry/lorry.model';
import { trips, tripsTable } from '../trips/trips.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private __http:HttpClient
  ) { }

  private apiHost = "http://localhost:8080";

  private RegisterUrl = `${this.apiHost}/api/v1/auth/register`;
  private AuthenticateUrl = `${this.apiHost}/api/v1/auth/authenticate`;

  private GetLocationsUrl = `${this.apiHost}/api/v1/location`;
  private PostLocationUrl = "http://localhost:8080/api/v1/location";
  private patchLocationUrl = "http://localhost:8080/api/v1/location";

  private GetLorryWithDriverNameUrl = "http://localhost:8080/api/v1/lorry/driverName";
  private GetDriversNameWithLorryIdUrl = "http://localhost:8080/api/v1/driver/names";
  private PutLorry = "http://localhost:8080/api/v1/lorry";
  private PatchLorryUrl = "http://localhost:8080/api/v1/lorry"
  private UnAssignDriver = "http://localhost:8080/api/v1/lorry/unassignDriver";
  private AssignDriverUrl = "http://localhost:8080/api/v1/lorry/assignDriver";

  private GetDriverWithLorry = "http://localhost:8080/api/v1/driver/lorry";
  private PutDriver = "http://localhost:8080/api/v1/driver";
  private GetDriverById = "http://localhost:8080/api/v1/driver";

  private GetExpenses = "http://localhost:8080/api/v1/expenses";
  private GetExpensesCategory = "http://localhost:8080/api/v1/expensesCategory";
  private GetFuelExpenses = "http://localhost:8080/api/v1/fuel";

  private GetCylinderDetails = "http://localhost:8080/api/v1/cylinder";

  private GetTripsForTable= "http://localhost:8080/api/v1/trips/tripsTable";
  private GetTripLocation = "http://localhost:8080/api/v1/location/tripTable";
  private GetTripLorry = "http://localhost:8080/api/v1/lorry/numberPlate";
  private PutTrip = "http://localhost:8080/api/v1/trips";

  private GetDriverIdName = `${this.apiHost}/api/v1/driver/idAndName`;

  signUp(user: RegisterUser): Observable<AuthToken> {
    return this.__http.post<AuthToken>(this.RegisterUrl, user);
  }

  signIn(user: User): Observable<AuthToken> {
    return this.__http.post<AuthToken>(this.AuthenticateUrl, user);
  }

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

  getDriversData(): Observable<Driver[]> {
    return this.__http.get<Driver[]>(this.GetDriverWithLorry);
  }

  putDriver(driver:any): Observable<Driver> {
    return this.__http.put<Driver>(this.PutDriver, driver);
  }

  patchDriver(driver:Driver): Observable<Driver> {
    return this.__http.patch<Driver>(this.PutDriver, driver);
  }

  getDriverById(id:number): Observable<DriverForm> {
    return this.__http.get<DriverForm>(this.GetDriverById + '/' + id);
  }

  getAllExpenses(): Observable<Expenses[]> {
    return this.__http.get<Expenses[]>(this.GetExpenses);
  }

  getAllExpensesCategory(): Observable<ExpensesCategory[]> {
    return this.__http.get<ExpensesCategory[]>(this.GetExpensesCategory);
  }

  putExpenses(expenses:Expenses): Observable<Expenses> {
    return this.__http.put<Expenses>(this.GetExpenses, expenses);
  }

  patchExpenses(expenses:Expenses): Observable<Expenses> {
    return this.__http.patch<Expenses>(this.GetExpenses, expenses);
  }

  getAllFuelExpenses(): Observable<FuelExpenses[]> {
    return this.__http.get<FuelExpenses[]>(this.GetFuelExpenses);
  }

  getExpenseById(id: number): Observable<Expenses> {
    return this.__http.get<Expenses>(this.GetExpenses + '/' + id);
  }

  putFuelExpenses(fuel: FuelExpenses): Observable<FuelExpenses> {
    return this.__http.put<FuelExpenses>(this.GetFuelExpenses, fuel);
  }

  patchFuelExpenses(fuel: FuelExpenses): Observable<FuelExpenses> {
    return this.__http.patch<FuelExpenses>(this.GetFuelExpenses, fuel);
  }

  getAllCylinder(): Observable<cylinder[]> {
    return this.__http.get<cylinder[]>(this.GetCylinderDetails);
  }

  getAllTripsTable(): Observable<tripsTable[]> {
    return this.__http.get<tripsTable[]>(this.GetTripsForTable);
  }

  getAllLocationForTrip(): Observable<Location[]> {
    return this.__http.get<Location[]>(this.GetTripLocation);
  }

  getAllLorryForTrip(): Observable<Lorry[]> {
    return this.__http.get<Lorry[]>(this.GetTripLorry);
  }

  putTripDetail(trip: trips): Observable<trips> {
    return this.__http.put<trips>(this.PutTrip, trip);
  }

  getAllDriverIdName(): Observable<Driver[]> {
    return this.__http.get<Driver[]>(this.GetDriverIdName);
  }
}
