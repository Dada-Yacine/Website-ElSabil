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

  
  getAbsencesByGroupAndSessionAndDate(group_id:string,session_id:string,date:string){
    let url = 'http://localhost:3000/absence/filter?';
    if(group_id!=undefined && group_id!="") 
      url +='group_id='+group_id

    if(session_id!=undefined && session_id!="") {
      if(url.at(url.length-1)!="?") 
      url +='&';
      url +='session_id='+session_id ;
    }

    if(date!=undefined && date!="") {
      if(url.at(url.length-1)!="?") 
        url +='&';
      url +='date='+date;
    }
    return this.http.get(url,{responseType:'json'});
  }
}
