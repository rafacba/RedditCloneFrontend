import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { AuthService } from "./service/auth.service";
import { LoginResponse } from './auth/login/login-response.payload';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    
    constructor(public _auth: AuthService) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1
            || (req.url.indexOf('/api/posts/') !==-1 && req.method.indexOf('GET')!== -1)
            || (req.url.indexOf('/api/subreddit/') !==-1 && req.method.indexOf('GET')!== -1)) {
            //console.log('Pasa 1');
            return next.handle(req);
        }

        const jwtToken = this._auth.getJwtToken();
        
        return next.handle(this.addToken(req, jwtToken!)).pipe(catchError(error => {
            if(error instanceof HttpErrorResponse && error.status === 403) {
                return this.handleAuthErrors(req,next);
            } else {
                return throwError(error);
            }
        }));
    }
    
    
    addToken(req: HttpRequest<any>, jwtToken: string) {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer '+ jwtToken) 
        });
    }
    
    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this._auth.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req,refreshTokenResponse.authenticationToken));
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result=> result !==null),
                take(1),
                switchMap((res)=>{
                    return next.handle(this.addToken(req, this._auth.getJwtToken()!))
                })
            );
        }
    }

}