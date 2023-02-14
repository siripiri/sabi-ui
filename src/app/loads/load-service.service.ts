import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiServiceService } from '../api-services/api-service.service';
import { cylinder } from './loads-model';

@Injectable({
  providedIn: 'root'
})
export class LoadServiceService {

  constructor(
    private apiService: ApiServiceService
  ) { }

  getAllCylinder(): Observable<cylinder[]> {
    return this.apiService.getAllCylinder();
  }
}
