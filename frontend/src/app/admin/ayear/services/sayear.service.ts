import { Injectable } from '@angular/core';
import { Ayear } from '../ayear';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SayearService {

  constructor(private http:HttpClient) { }

  endpoint = 'http://localhost:8080/annees-scolaires';

  getallayears(): Observable<Ayear[]> {
    return this.http.get<Ayear[]>(this.endpoint);
  }

  getayear(id:number): Observable<Ayear> {
    return this.http.get<Ayear>(`${this.endpoint}/${id}`);
  }

  updateayear(id:number, data: any): Observable<Ayear> {
    return this.http.patch<Ayear>(`${this.endpoint}/${id}`, data);
  }

  deleteayear(id:number): Observable<unknown> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }

  createayear(Data:any): Observable<Ayear> {
    return this.http.post<Ayear>(this.endpoint,Data);
  }

}
