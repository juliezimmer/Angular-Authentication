import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
   // stores backend api url
   private _registerUrl = "http://localhost:5000/api/register";
   private _loginUrl = "http://localhost:5000/api/login";

   constructor(private http: HttpClient, private _router: Router) { }

   registerUser(user){
      return this.http.post<any>(this._registerUrl, user)
   }

   loginUser(user){
      // http 'get' request
      return this.http.post<any>(this._loginUrl,user);  
   }

   logoutUser(){
      localStorage.removeItem('token') 
      // when the token has been removed, the user navigates to the events view
      this._router.navigate(['/events'])
   }

   getToken(){
      return localStorage.getItem('token')
   }
   
   loggedIn(){
      // checks local storage for an auth token and always returns true or false
      return !!localStorage.getItem('token')
   }
}
