import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8082/api/tasks';
  private api='http://localhost:8082/api/tasks/task';

  constructor(private http: HttpClient) {}
  createTask(task: Task,file:File): Observable<Task> {
    let formData = new FormData();
    if (task.file) {
      formData.append('file',file, file.name);
    }
    formData.append('name', task.name);
    formData.append('date', task.date);
    formData.append('courseId', String(task.course?.id || 0));

    return this.http.post<Task>(`${this.api}`, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('error task:', error);
        return throwError(error);
      })
    );
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}`);
  }

  updateTask(task: Task): Observable<Task> {
    const formData = new FormData();
    if (task.file) {
      formData.append('file',task.file);
    }
    formData.append('name', task.name);
    formData.append('date', task.date);
    formData.append(' course_id', String(task.course?.id || 0));
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    const options = { headers: headers };
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, formData,options);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskId}`);
  }
}

