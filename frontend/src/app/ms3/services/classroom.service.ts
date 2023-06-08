import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClassroom } from '../models/classroom.model';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http:HttpClient) { }
  
  getAll(){
    return this.http.get('http://localhost:3000/classroom',{responseType:'json'});
  }
  add(absence:IClassroom){
    return this.http.post('http://localhost:3000/classroom/',absence,{responseType:'json'});
  }
  edit(id:string|undefined, absence:IClassroom){
    return this.http.put('http://localhost:3000/classroom/'+id,absence,{responseType:'json'});
  }
  delete(id:string|undefined){
    return this.http.delete('http://localhost:3000/classroom/'+id,{responseType:'json'});
  }
}
