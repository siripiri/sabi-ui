import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, retry } from 'rxjs';
import { ApiServiceService } from '../api-services/api-service.service';
import { Driver } from '../driver/driver.model';
import { Address } from '../location/location.model';
import { Lorry, LorryTable } from './lorry.model';

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

  patchLorry(lorry: Lorry, lorryId:number | null ): Observable<Lorry> {
    lorry.id = lorryId;
    return this.apiService.patchLorry(lorry);
  }

  unassignDriver(lorry: Lorry): Observable<Lorry> {
    return this.apiService.unassignDriver(lorry);
  }

  assignDriver(lorry: Lorry): Observable<Lorry> {
    return this.apiService.assignDriver(lorry);
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
}
