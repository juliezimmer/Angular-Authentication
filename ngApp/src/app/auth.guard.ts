import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate { 
   constructor (private _router: Router, private _authService: AuthService){}
   
   canActivate(): boolean {
      // if user is logged in
      if (this._authService.loggedIn()) {
         console.log('true')
         return true
      } else { // if false is returned, navigate to the logIn view for the user to login to the application.
         console.log('false')
         this._router.navigate(['/login'])
         return false
      }
   }
}
