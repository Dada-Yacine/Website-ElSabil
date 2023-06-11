import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class S2Service {
  private baseUrl = 'http://localhost:9040/api';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(`${this.baseUrl}/login`, body.toString(),{headers:headers});
  }
  setToken(res:any) {
    localStorage.setItem('token', res);
  }
  getToken():string {
    return localStorage.getItem('token')+"";
  }    
  getUserId(){ 
    let authToken = this.getToken(); 
    let id = ""; 
    if(authToken!=""){ 
      try{ 
        id = JSON.parse(atob(authToken.split('.')[1])).id; 
      }catch(e){} 
    } 
    return id; 
  }
  removeToken() {
    localStorage.removeItem('token');
  }
  
  
  
  
  
  
  getUserRole(){
    let authToken = this.getToken();
    let role = "";
    if(authToken!=""){
      try{
        role = JSON.parse(atob(authToken.split('.')[1])).role;
      }catch(e){}
    }
    return role;
  }
  
  forgotPassword(username: string): Observable<any> {
    const body = new HttpParams()
      .set('username', username);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
    return this.http.post<any>('http://localhost:9040/api/forgot-password', body, { headers });
  }
  resetPassword(token: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('token', token)
      .set('password', password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
    return this.http.post<any>('http://localhost:9040/api/reset-password', body, { headers });
  }

}
