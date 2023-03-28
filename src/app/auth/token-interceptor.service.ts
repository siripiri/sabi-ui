import { Injectable , Injector} from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector : Injector) { }
  intercept(req:any, next:any){
    let authservice = this.injector.get(AuthServiceService);
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization: `Bearer ${authservice.getToken()}`
      }
    });
    return authservice.getToken() != null ? next.handle(tokenizedReq) : next.handle(req.clone());
  }
}
