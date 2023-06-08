import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MsService {

  constructor(private http:HttpClient) { }  
  
  getLevels(){
    return this.http.get('http://localhost:1111/ms2/niveaux',{responseType:'json'});
  }  
  getYearsByLevel(id:string){
    return this.http.get('http://localhost:1111/ms2/niveau/'+id+'/annees',{responseType:'json'});
  }
  getGroupsByYear(id:string){
    return this.http.get('http://localhost:1111/ms2/annee/'+id+'/groupes',{responseType:'json'});
  }
  getCoursesByGroupe(id:string){
    return this.http.get('http://localhost:1111/ms2/groupe/'+id+'/cours',{responseType:'json'});
  }
  getStudentsByGroupe(id:string){
    return this.http.get('http://localhost:1111/ms2/groupe/'+id+'/students',{responseType:'json'});
  }
  getTeachersByLevel(id:string){
    return this.http.get('http://localhost:1111/ms2/niveau/'+id+'/teachers',{responseType:'json'});
  }
}
