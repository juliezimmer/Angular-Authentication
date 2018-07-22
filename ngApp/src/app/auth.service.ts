import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   // stores backend api url
   private _registerUrl = "http://localhost:5000/api/register";

   constructor(private http: HttpClient) { }

   registerUser(user){
      return this.http.post<any>(this._registerUrl, user)
   }
}
