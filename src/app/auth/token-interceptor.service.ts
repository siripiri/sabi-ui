import { Injectable , Injector} from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector : Injector,
    private router:Router
  ) { }

  intercept(req:any, next:any){
    let authservice = this.injector.get(AuthServiceService);
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization: `Bearer ${authservice.getToken()}`
      }
    });
    return authservice.getToken() != null && this.checkForAuth() ? next.handle(tokenizedReq) : next.handle(req.clone());
  }

  checkForAuth() {
    if(this.router.url == '/signUp' || this.router.url == '/signIn')
      return false;
    return true
  }
}
