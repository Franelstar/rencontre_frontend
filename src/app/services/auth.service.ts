import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private subject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  // createNewUser(email: string, password: string) {

  // }

  signInUser(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/login`, {
      email,
      password
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
