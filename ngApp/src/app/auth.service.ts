import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   // stores backend api url
   private _registerUrl = "http://localhost:5000/api/register";
   private _loginUrl = "http://localhost:5000/api/login";

   constructor(private http: HttpClient) { }

   registerUser(user){
      return this.http.post<any>(this._registerUrl, user)
   }

   loginUser(user){
      // http 'get' request
      return this.http.post<any>(this._loginUrl,user);  
   }

   loggedIn(){
      // checks local storage for an auth token and always returns true or false
      return !!localStorage.getItem('token')
   }
}
