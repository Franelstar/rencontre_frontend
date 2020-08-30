import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor(private http: HttpClient) { }

  getusers(data: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}recherche/${localStorage.getItem('id')}`, data);
  }

  getuser(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}recherche/${id}`);
  }
}
