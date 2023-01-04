import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiServiceService } from '../api-services/api-service.service';
import { Address } from '../location/location.model';
import { DriverTable, Driver, DriverForm } from './driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(
    private apiService: ApiServiceService
  ) { }

  getDriverTable(): Observable<DriverTable[]> {
    return this.apiService.getDriversData()
      .pipe(
        map((drivers: Driver[]) => {
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
      gender: driver.gender,
      age: age,
      address: address,
      phoneNumber1: driver.phoneNumber1,
      phoneNumber2: driver.phoneNumber2,
      lorry: driver.numberPlate
    }
  }

  getDriverById(id: number): Observable<DriverForm> {
    return this.apiService.getDriverById(id);
  }

  patchDriver(driverForm: Driver, id: any): Observable<Driver> {
    const driverDto = this.driverFormTodriver(driverForm);
    let driver: Driver = driverDto.driver;
    driver.address = driverDto.address;
    driver.id = id;
    console.log(driver);
    return this.apiService.patchDriver(driver);
  }

  putDriver(driverForm: any): Observable<Driver> {
    let address: Address = {
      address: driverForm.address,
      city: driverForm.city,
      state: driverForm.state,
      zipcode: driverForm.zipcode
    }
    let driver: any = {
      driverName: driverForm.driverName,
      dob: driverForm.dob,
      childrenDetails: driverForm.childrenDetails,
      address: address
    }

    return this.apiService.putDriver(driver);
  }

  putDriverForm(driver: DriverForm): Observable<Driver> {
    return this.apiService.putDriver(driver);
  }

  private driverFormTodriver(driverForm: any) {
    let address: Address = {
      address: driverForm.address,
      city: driverForm.city,
      state: driverForm.state,
      zipcode: driverForm.zipcode
    };
    let driver: any = {
      driverName: driverForm.driverName,
      dob: driverForm.dob,
      childrenDetails: driverForm.childrenDetails,
      address: address
    };
    return {
      address: address,
      driver: driver
    };
  }
}
