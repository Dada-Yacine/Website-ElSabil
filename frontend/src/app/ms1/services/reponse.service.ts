import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {


  private baseUrl = 'http://localhost:8082/api/tasks';

  constructor(private http: HttpClient) { }

  getTasksByEtudiantId(etudiantId: number): Observable<Task[]> {
    const url = `${this.baseUrl}/${etudiantId}/devoirs`;
    return this.http.get<Task[]>(url);
  }
  getTasksForStudent(studentId: number): Observable<Map<Course, Task[]>> {
    return this.http.get<Map<Course, Task[]>>(`http://localhost:8082/api/tasks/students/${studentId}/tasks`);
  }
  /*getTasksForStudent(studentId: number): Observable<Course[]>{
    return this.http.get<Course[]>(`http://localhost:8082/api/tasks/students/${studentId}/tasks`);}
*/
 /* addSolution(etudiantId: number, taskId: number, solutionFile: FormData): Observable<void> {
    const url = `${this.baseUrl}/${etudiantId}/devoirs/${taskId}`;
    return this.http.post<void>(url, solutionFile);
  }*/
  addSolutionToTask(etudiantId: number, devoirId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);


    return this.http.post(`http://localhost:8082/api/tasks/${etudiantId}/devoirs/${devoirId}/solutions`, formData);
  }
}
