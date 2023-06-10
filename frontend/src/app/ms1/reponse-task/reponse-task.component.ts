import { Component, OnInit } from '@angular/core';
import { ReponseService } from '../services/reponse.service';
import { Task } from '../models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';



import { HttpClient, HttpResponse } from '@angular/common/http';
import { Course } from '../models/course.model';




@Component({
  selector: 'app-reponse-task',
  templateUrl: './reponse-task.component.html',
  styleUrls: ['./reponse-task.component.css']
})
export class ReponseTaskComponent implements OnInit {
  tasks: Task[] = [];
  etudiantId!: number ;
  showFileInput = false;
  fileIsDragging: boolean = false;
  activeRow!: number | null;

  selectedFile!: File;
  coursesArray: Course[] = [];
  courses: Map<any, any> = new Map();








  constructor(private apiService: ReponseService,private http:HttpClient,private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.etudiantId= 1;//Number(this.authservice.getUserId());
    /*this.getTasks(3);*/
    this.apiService.getTasksForStudent(this.etudiantId).subscribe(
      (response: any) => {
        this.courses = response;
        console.log('Courses retrieved successfully');
        console.log(this.courses);




      },
      (error: any) => {
        console.error('Error retrieving courses:', error);
      }
    );}





  /*getTasks(etudiantId: number): void {
    this.apiService.getTasksByEtudiantId(etudiantId).subscribe(
      (response: Task[]) => {
        this.task = response;
      },
      (error:any) => {
        console.error('Error retrieving tasks:', error);
      }
    );
  }*/

  downloadTask(taskId: number) {
    const url = `http://localhost:8082/api/tasks/${taskId}/download`;
    this.http.get(url, { responseType: 'blob', observe: 'response' }).subscribe(
      (response: HttpResponse<Blob>) => {
        const responseBody = response.body;
        if (responseBody !== null) {
          const filename = this.getFilenameFromResponse(response);
          this.saveFile(responseBody, filename);
        } else {
          console.error('Empty response body');
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  getFilenameFromResponse(response: HttpResponse<Blob>): string {
    const contentDisposition = response.headers.get('content-disposition');
    const filenameMatch = contentDisposition && contentDisposition.match(/filename="?(.+)"?/);
    return filenameMatch && filenameMatch[1] ? filenameMatch[1] : 'file';
  }

  saveFile(response: Blob, filename: string) {
    const blob = new Blob([response], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  addSolution(etudiantId: number, devoirId: number, fileInput: HTMLInputElement): void {
    const file = fileInput?.files?.[0] || null;

    if (file) {
      this.apiService.addSolutionToTask(etudiantId, devoirId,file).subscribe(
        () => {
          console.log('Solution added successfully');
          this.showSuccessNotification();

          // Perform any additional actions after adding the solution
        },
        (error: any) => {
          console.error('Error adding solution:', error);
          this.showErrorNotification()
        }
      );
    }
  }
  showNotification(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass:isError ? 'error-notification' : 'default-notification', // Duration in milliseconds
    });}
  handleDrop(event: DragEvent, taskId: number) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.files = event.dataTransfer?.files;

      this.addSolution(this.etudiantId, taskId, fileInput);
    }
  }
  toggleFileInput() {
    this.showFileInput = !this.showFileInput;
  }





  handleDragOver(event: DragEvent) {
    event.preventDefault();
  }
  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  showSuccessNotification(): void {
    this.showNotification('la solution de devoir ajoutée avec succès');
  }

  showErrorNotification(): void {
    this.showNotification("Erreur lors de l'ajout de la solution de devoir", true);
  }
 /* addSolution(taskId: number): void {
    const etudiantId = 1; // Replace with the actual student ID
    const formData: FormData = new FormData();
  formData.append('file', this.selectedFile);
    this.apiService.addSolutionToTask(etudiantId, taskId,formData)
      .subscribe(response => {
        // Handle success response
        console.log('Solution added successfully');
      }, error => {
        // Handle error response
        console.error('Failed to add solution:', error);
      });
  }*/





}
