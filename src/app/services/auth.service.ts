import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private subject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  createNewUser(name: string,
                 email: string,
                 password: string,
                 password_confirmation: string): Observable<any> {
     return this.http.post(`${environment.apiUrl}auth/signup`, {
       name,
       email,
       password,
       password_confirmation
     }).pipe(
       retry(2)
     );
  }

  signInUser(email: string, password: string, remember_me: boolean): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/login`, {
      email,
      password,
      remember_me
    });
  }

  signOutUser(): Observable<any> {
    this.subject.next({ b: false });
    return this.http.get(`${environment.apiUrl}auth/logout`);
  }

  reloadHeader(isAuth: boolean): void{
    this.subject.next({ b: isAuth });
  }

  emitReloadHeader(): Observable<any>{
    return this.subject.asObservable();
  }
}
