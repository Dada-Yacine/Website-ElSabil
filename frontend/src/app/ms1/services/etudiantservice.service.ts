import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiants } from '../models/etudiants.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantserviceService {



  private apiUrl = 'http://localhost:9040/api/etudiants';

    constructor(private http: HttpClient) { }

    ajouterEtudiant(etudiant: Etudiants): Observable<any> {
      const url = `${this.apiUrl}/ajoutetudiant`;
      return this.http.post(url, etudiant);
    }
    getEtudiants(): Observable<Etudiants[]> {
      const url = `${this.apiUrl}/student`;
      return this.http.get<Etudiants[]>(url);
    }

    supprimerEtudiant(id: number,role:String): Observable<void> {
      const url = `${this.apiUrl}/${id}/?role=${role}`;
      return this.http.delete<void>(url);
    }
    modifierEtudiant(etudiant: Etudiants): Observable<Etudiants> {
      const url = `${this.apiUrl}/${etudiant.id}`;
      return this.http.patch<Etudiants>(url, etudiant);
    }
    getEtudiantById(etudiantId: number): Observable<Etudiants> {
      const url = `${this.apiUrl}/${etudiantId}`;
      return this.http.get<Etudiants>(url);
    }


}


