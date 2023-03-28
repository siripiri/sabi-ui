import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiServiceService } from '../api-services/api-service.service';
import { AuthToken, RegisterUser, User } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private apiService: ApiServiceService,
    private __router: Router
  ) { }

  signIn(user: User): Observable<AuthToken> {
    return this.apiService.signIn(user);
  }

  signUp(user: RegisterUser): Observable<AuthToken> {
    return this.apiService.signUp(user);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.__router.navigate(['/signUp'])
  }

}
