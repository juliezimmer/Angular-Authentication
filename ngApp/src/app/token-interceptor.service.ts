import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

   constructor(private injector: Injector) { }

   // the intercept method takes in two parameters:
   //    1. the request that is intercepted (req)
   //    2. next (to pass on execution)
   intercept(req, next) {
      let authService = this.injector.get(AuthService)
      // make a clone of the request
      let tokenizedReq = req.clone({
         // Add the authorization information to the header of the clone request using setHeaders, which has an object for its value
         setHeaders: {
            // The value of the authorization information added to the header is presented as a Bearer Token. 
            // The format is: the string 'Bearer', space, actual token value 
            Authorization: `Bearer ${authService.getToken()}`
         }
      })
      return next.handle(tokenizedReq)
   }  
}
