import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequestPayload } from '../auth/signup/signup-request.payload';
import { LoginRequestPayload } from '../auth/login/login-request.payload'
import {map} from 'rxjs/operators'

 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "http://localhost:8080/api/auth/";

  constructor(private http: HttpClient) { }

  signup(signupRequestpayload: SignupRequestPayload) :Observable<any> {  
    return this.http.post(`${this.url}signup`,signupRequestpayload, {responseType: 'text'});
  }

  login(loginRequest:LoginRequestPayload): Observable<boolean> {
    return this.http.post(`${this.url}login`,loginRequest)
      .pipe(map((data:any)=>{
        localStorage.setItem('authenticationToken', data.authenticationToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('expiresAt', data.expiresAt);
        localStorage.setItem('username',data.username);
        return true;
      }));
  }
}


