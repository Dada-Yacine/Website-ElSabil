import { Injectable } from '@angular/core';
import { Year } from '../year';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyearService {

  constructor(private http:HttpClient) { }
  endpoint = 'http://localhost:8080/annees';

  getallyears(): Observable<Year[]> {
    return this.http.get<Year[]>(this.endpoint);
  }

  getyear(anneeId:number): Observable<Year> {
    return this.http.get<Year>(`${this.endpoint}/${anneeId}`);
  }

  updateyear(anneeId:number, anneeScolaireId: number, niveauId: number , Data: any): Observable<Year> {
    return this.http.patch<Year>(`${this.endpoint}/${anneeId}/${anneeScolaireId}/${niveauId}`, Data);
  }

  deleteyear(anneeId:number): Observable<unknown> {
    return this.http.delete<void>(`${this.endpoint}/${anneeId}`);
  }

  createyear(anneeScolaireId: number,niveauId: number, Data:any): Observable<Year> {
    return this.http.post<Year>(`${this.endpoint}/${anneeScolaireId}/${niveauId}`, Data);
  }

}
