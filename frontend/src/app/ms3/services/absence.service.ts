import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAbsence } from '../models/absence.model';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http:HttpClient) { }

  addAbsences(absences:IAbsence[]){
    return this.http.post('http://localhost:3000/absence/multi/',absences,{responseType:'json'});
  }

  getAbsencesBySessionAndDate(id:string,date:string){
    return this.http.get('http://localhost:3000/absence/bySessionAndDate/'+id+'/'+date,{responseType:'json'});
  }
  getAbsencesByStudent(id:string){
    return this.http.get('http://localhost:3000/absence/byStudent/'+id,{responseType:'json'});
  }
  getAbsencesByTeacher(id:string){
    return this.http.get('http://localhost:3000/absence/byTeacher/'+id,{responseType:'json'});
  }
  edit(id:string|undefined, absence:IAbsence){
    return this.http.put('http://localhost:3000/absence/'+id,absence,{responseType:'json'});
  }
  delete(id:string|undefined){
    return this.http.delete('http://localhost:3000/absence/'+id,{responseType:'json'});
  }
}
