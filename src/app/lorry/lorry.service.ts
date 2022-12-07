import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiServiceService } from '../api-services/api-service.service';
import { DriverName, Lorry, LorryTable } from './lorry.model';

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
      id: lorry.id,
      numberPlate: lorry.numberPlate,
      type: lorry.type,
      modelNumber: lorry.modelNumber,
      manufacturer: lorry.manufacturer,
      driverName: lorry.driverName
    };
  }

  getDriverNamesDropDown(): Observable<DriverName[]> {
    return this.apiService.getDriverNamesData();
  }

  postLorrywithDriver(lorry: any, driverId: number){
    lorry.driverId = driverId;
    console.log(lorry);
  }

  postLorryWithoutDriver(lorry: any){
    console.log(lorry);
  }
}
