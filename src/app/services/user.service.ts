import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/model/user.model';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    update_informations(data: FormData): Observable<any> {
     return this.http.post(`${environment.apiUrl}informationPersonnelles/${localStorage.getItem('id')}`, data).pipe(
       retry(2)
     );
    }

    getUserInfos(): Observable<any> {
      return this.http.get(`${environment.apiUrl}informationPersonnelles/${localStorage.getItem('id')}`);
    }

    getUserPhysique(): Observable<any> {
      return this.http.get(`${environment.apiUrl}informationPhysiques/${localStorage.getItem('id')}`);
    }

    update_physiques(data: FormData): Observable<any> {
      return this.http.post(`${environment.apiUrl}informationPhysiques/${localStorage.getItem('id')}`, data).pipe(
        retry(2)
      );
     }
}
