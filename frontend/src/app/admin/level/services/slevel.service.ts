import { Injectable } from '@angular/core';
import { Level } from '../level';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SLevelService {

  constructor(private http:HttpClient) { }
  endpoint = 'http://localhost:8080/niveaux';

  getalllevels(): Observable<Level[]> {
    return this.http.get<Level[]>(this.endpoint);
  }

  getlevel(niveauId:number): Observable<Level> {
    return this.http.get<Level>(`${this.endpoint}/${niveauId}`);
  }

  updatelevel(niveauId:number, data: any): Observable<Level> {
    return this.http.put<Level>(`${this.endpoint}/${niveauId}`, data);
  }

  deletelevel(niveauId:number): Observable<unknown> {
    return this.http.delete<void>(`${this.endpoint}/${niveauId}`);
  }

  createlevel(Data:any): Observable<Level> {
    return this.http.post<Level>(this.endpoint,Data);
  }

  }
