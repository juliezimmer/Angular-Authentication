import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   registerUserData = {}
   
   constructor(private _auth: AuthService, private _router: Router) { }

   ngOnInit() {
   }

   registerUser(){
      // calls the auth.service registerUser() method and passed the registerUserData property/object in as user. 
      this._auth.registerUser(this.registerUserData)
         .subscribe(
            res => {
               localStorage.setItem('token', res.token)
               this._router.navigate(['/special'])
            },
            err => console.log(err)
         )
   }
}
