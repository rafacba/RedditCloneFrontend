import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { SignupRequestPayload } from '../auth/signup/signup-request.payload';
import { LoginRequestPayload } from '../auth/login/login-request.payload'
import {map, tap} from 'rxjs/operators'
import { LoginResponse } from '../auth/login/login-response.payload';

 
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
  
  refreshToken() {
      const refreshTokenPayload = {
        refreshToken: this.getRefreshToken(),
        username: this.getUsername()
      }
      return this.http.post<LoginResponse>(`${this.url}refresh/token`,refreshTokenPayload)
        .pipe(tap((response:any)=>{
          localStorage.setItem('authenticationToken', response.authenticationToken);
          localStorage.setItem('expiresAt', response.expiresAt)
        }));
  }


  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  getUsername() {
    return localStorage.getItem('username');
  }
  
  getJwtToken() {
    return localStorage.getItem('authenticationToken');
  }
  
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
  
  logout() {
    this.http.post(`${this.url}auth/logout`, this.refreshToken, {responseType: 'text'})
      .subscribe(data=>{
        console.log(data);
      }, error =>{
        throwError(error);
      });
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
  }
}


