import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, retry } from 'rxjs';
import { ApiServiceService } from '../api-services/api-service.service';
import { Address } from '../location/location.model';
import { Driver, DriverTable, Lorry, LorryTable } from './lorry.model';

@Injectable({
  providedIn: 'root'
})
export class LorryService {

  onDriverSelect: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(
    private apiService: ApiServiceService
  ) {}

  getLorryTable(): Observable<LorryTable[]> {
    return this.apiService.getLorryData()
      .pipe(
        map(lorrys => {
          let lorryTables: LorryTable[] = [];
          lorrys.forEach(lorry => {
            lorry.driverName == null ? lorry.driverName = "Not Assigned" : lorry.driverName;
            lorryTables.push(this.lorryToLorryTable(lorry));
          })
          return lorryTables;
        })
      );
  }

  lorryToLorryTable(lorry: Lorry): LorryTable {
    return {
      id: lorry.id as number,
      numberPlate: lorry.numberPlate,
      type: lorry.type,
      modelNumber: lorry.modelNumber,
      manufacturer: lorry.manufacturer,
      driverName: lorry.driverName as string
    };
  }

  getDriverNamesDropDown(): Observable<Driver[]> {
    return this.apiService.getDriverNamesData();
  }

  putLorry(lorry: Lorry): Observable<any> {
    return this.apiService.putLorry(lorry);
  }

  patchLorry(lorry: Lorry): Observable<Lorry> {
    return this.apiService.patchLorry(lorry);
  }

  unassignDriver(lorry: Lorry): Observable<Lorry> {
    return this.apiService.unassignDriver(lorry);
  }

  assignDriver(lorry: Lorry): Observable<Lorry> {
    return this.apiService.assignDriver(lorry);
  }

  getDriverTable(): Observable<DriverTable[]> {
    return this.apiService.getDriversData()
      .pipe(
        map(drivers => {
          let driverTables: DriverTable[] = [];
          drivers.forEach(driver => {
            driver.numberPlate == null ? driver.numberPlate = 'Not Assigned' : driver.numberPlate;
            driverTables.push(this.driverToDriverTable(driver));
          });
          return driverTables;
        })
      )
  }

  private driverToDriverTable(driver: Driver): DriverTable {
    let address: string = driver.address.address + ' , ' + driver.address.city + ' , ' + driver.address.state;
    let splitValues = driver.dob.split('/');
    let dob = new Date(parseInt(splitValues[2]), parseInt(splitValues[1]), parseInt(splitValues[0]));
    let diff = Date.now() - dob.getTime();
    let _age = new Date(diff);
    let age = Math.abs(_age.getUTCFullYear() - 1970);
    return {
      id: driver.id,
      name: driver.driverName,
      age: age,
      address: address,
      childrenDetails: driver.childrenDetails,
      lorry: driver.numberPlate
    }
  }

  putDriver(driverForm: any): Observable<Driver> {
    let address:Address = {
      address: driverForm.address,
      city: driverForm.city,
      state: driverForm.state,
      zipcode: driverForm.zipcode
    }
    let driver:any = {
      driverName: driverForm.driverName,
      dob: driverForm.dob,
      childrenDetails: driverForm.childrenDetails,
      address: address
    }

    return this.apiService.putDriver(driver);
  }

  getDriverById(id:number): Observable<Driver> {
    return this.apiService.getDriverById(id);
  }
}
