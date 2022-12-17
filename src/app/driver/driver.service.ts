import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiServiceService } from '../api-services/api-service.service';
import { Address } from '../location/location.model';
import { Driver } from '../lorry/lorry.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(
    private apiService: ApiServiceService
  ) { }

  patchDriver(driverForm:Driver, id: any): Observable<Driver> {
    const driverDto = this.driverFormTodriver(driverForm);
    let driver:Driver = driverDto.driver;
    driver.address = driverDto.address;
    driver.id = id;
    console.log(driver);
    return this.apiService.patchDriver(driver);
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

  private driverFormTodriver(driverForm:any) {
    let address:Address = {
      address: driverForm.address,
      city: driverForm.city,
      state: driverForm.state,
      zipcode: driverForm.zipcode
    };
    let driver:any = {
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
