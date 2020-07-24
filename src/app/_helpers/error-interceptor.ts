import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {AuthService} from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 || err.status === 403) {
                // auto logout if 401 response returned from api
                this.authService.signOutUser();
                location.href = '/auth/signin';
            }

            // const error = err.error.message || err.statusText;
            if (err.status === 500) {
              err.error.message = 'Une erreur est survenue, reéssayez plus tard.';
              return throwError(err);
            }
            return throwError(err);
        }));
    }
}
