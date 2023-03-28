import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthServiceService } from "./auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate{
  constructor(private _authService : AuthServiceService,private _router : Router){}
  canActivate():boolean{
    if(this._authService.isLoggedIn()){
      return true;
    }
    else{
      this._router.navigate(['/signUp']);
      return false;
    }
  }
}
