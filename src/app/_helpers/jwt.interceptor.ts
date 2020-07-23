import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        // const currentUser = this.authService.currentUserValue;
        const isLoggedIn = localStorage.getItem('access_token');
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'X-Requested-With': 'XMLHttpRequest',
                  Authorization: `Bearer ${isLoggedIn}`
                }
            });
        } else if (isApiUrl) {
          request = request.clone({
            setHeaders: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            }
          });
        }

        return next.handle(request);
    }
}
