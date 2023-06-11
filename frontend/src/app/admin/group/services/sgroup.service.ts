import { Injectable } from '@angular/core';
import { Group } from '../group';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SgroupService {

  constructor(private http:HttpClient) { }
  endpoint = 'http://localhost:8080/groupes';

  getallgroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.endpoint);
  }

  getgroup(groupeId:number): Observable<Group> {
    return this.http.get<Group>(`${this.endpoint}/${groupeId}`);
  }

  updategroup(groupeId:number, annneeID: number, Data: any): Observable<Group> {
    return this.http.put<Group>(`${this.endpoint}/${groupeId}/${annneeID}`, Data);
  }

  deletegroup(groupeId:number): Observable<unknown> {
    return this.http.delete<void>(`${this.endpoint}/${groupeId}`);
  }

  creategroup(annneeID: number, Data:any): Observable<Group> {
    return this.http.post<Group>(`${this.endpoint}/${annneeID}`, Data);
  }

}
