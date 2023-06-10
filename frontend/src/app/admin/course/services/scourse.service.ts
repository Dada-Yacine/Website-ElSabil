import { Injectable } from '@angular/core';
import { Course } from '../course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScourseService {

  constructor(private http:HttpClient) { }
  endpoint = 'http://localhost:8080/cours';

  getallcourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.endpoint);
  }

  getcourse(coursId:number): Observable<Course> {
    return this.http.get<Course>(`${this.endpoint}/${coursId}`);
  }

  updatecourse(coursId:number, data: any): Observable<Course> {
    return this.http.put<Course>(`${this.endpoint}/${coursId}`, data);
  }

  deletecourse(coursId:number): Observable<unknown> {
    return this.http.delete<void>(`${this.endpoint}/${coursId}`);
  }

  createcourse(Data:any): Observable<Course> {
    return this.http.post<Course>(this.endpoint,Data);
  }


}
