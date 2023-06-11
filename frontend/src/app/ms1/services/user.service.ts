import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedFile!: File ;
  private userId:number=1;
  private url = `http://localhost:9040/api/etudiants`;


  private baseUrl = "http://localhost:9040/api/etudiants/users";
  private apiUrl = "http://localhost:9040/api/etudiants";
  private baseurl = 'http://localhost:9040/apiuser/users';
private currentUser!: User;

  timestamp!: number;




  constructor(private http:HttpClient,private http1:HttpClient) {

   }
   getCurrentUserId(): number{
    return this.currentUser.id;

   }
   getUsers(idU: number) {
    return this.http.get(`${this.baseUrl}/${idU}`);
  }

  updatePassword(userId: number, oldPassword: string, newPassword: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http1.put(`${this.apiUrl}/${userId}/password?oldPassword=${oldPassword}&newPassword=${newPassword}`, { oldPassword, newPassword },{headers:headers});
  }


  updateUserAddress(userId:number,address: any): Observable<any> {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(`${this.baseurl}/${userId}/address`,  address,options );
  }

  updateUserPhone(userId:number,phone: string): Observable<any> {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.put(`${this.baseurl}/${userId}/phone`, phone ,options);

  }
  public uploadProfilePicture(userId: number, file: File): Observable<any> {
    let formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('userId', userId.toString());

    const headers = new HttpHeaders()
    headers.append('Accept', 'application/json');
    const options = { headers: headers };

    return this.http.post(`${this.url}/${userId}/profilePicture`, formData, options);
  }










  getProfilePicture(userId: number=1): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', '*/*');
    http://localhost:8083/apiuser/profilePicture/1

    return this.http.get(`${this.apiUrl}/profilePicture/${userId}`, { headers, responseType: 'blob' });
  }

}
