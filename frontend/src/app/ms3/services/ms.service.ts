import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MsService {

  constructor(private http:HttpClient) { }  
  
  getLevels(){
    return this.http.get('http://localhost:8080/niveaux',{responseType:'json'});
  }  
  getYearsByLevel(id:string){
    return this.http.get('http://localhost:8080/niveaux/'+id+'/annees',{responseType:'json'});
  }
  getGroupsByYear(id:string){
    return this.http.get('http://localhost:8080/annees/'+id+'/groupes',{responseType:'json'});
  }
  getCoursesByAnnee(id:string){
    return this.http.get('http://localhost:8080/annees/'+id+'/cours',{responseType:'json'});
  }
  getStudentsByGroupe(id:string){
    return this.http.get('http://localhost:9040/api/etudiants/etudiant/groupe/'+id,{responseType:'json'});
  }
  getAcademicYears(){
  return this.http.get('http://localhost:8080/annees-scolaires',{responseType:'json'});
  }
  getTeachersByLevel(id:string){
    return this.http.get('http://localhost:9040/api/etudiants/enseignant/niveau/'+id,{responseType:'json'});
  }
  getStudent(id:string){
    return this.http.get('http://localhost:9040/api/etudiants/'+id,{responseType:'json'});
  }

  
  getLastAcademicYear(list:any){
    if(list.length==0)
      return {min:'2009-01-01',max:'2010-01-01'}
    else{
      let item = list.sort((a:any,b:any)=>{
        if(a>b)
          return 1;
        else if(b>a)
          return -1
        else return 0
      })[0];
      return {min:item.nom.split('-')[0]+'-01-01',max:item.nom.split('-')[1]+'-12-31'}
    }
  }
}
