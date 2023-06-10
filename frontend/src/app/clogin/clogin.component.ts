import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { S2Service } from '../ms1/services/s2.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clogin',
  templateUrl: './clogin.component.html',
  styleUrls: ['./clogin.component.css']
})
export class CloginComponent implements OnInit {
  loginForm!: FormGroup;
  error!: string;
  focusUsername = false;
  focusPassword = false;
  loggedIn!: boolean;
  session: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private S2Service: S2Service,
    private router: Router,

  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loggedIn = this.isLoggedIn();
  }

  onFocusUsername() {
    this.focusUsername = true;
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    // Vérifiez si le token est présent et valide
    return token !== null && token !== undefined && token !== '';
  }
  onBlurUsername() {
    if (!this.loginForm.controls['username'].value) {
      this.focusUsername = false;
    }
  }

  onFocusPassword() {
    this.focusPassword = true;
  }

  onBlurPassword() {
    if (!this.loginForm.controls['password'].value) {
      this.focusPassword = false;
    }
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    const body = { username, password }; // Envoyer les données sous forme d'objet JSON
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Utiliser le type de contenu JSON

    this.http.post<any>('http://localhost:9040/api/login', body, { headers: headers }).subscribe(
      response => {
        // Connexion réussie
        console.log(response);
        const token = response.token;
       this.S2Service.setToken(token);// Assurez-vous que le token est une chaîne de caractères sans conversion
        console.log(this.S2Service.getUserId());
        console.log(this.S2Service.getUserRole());

          return this.router.navigate(['/login']);

      },
      error => {
        // Erreur de connexion
        console.log('Nom d\'utilisateur ou mot de passe incorrect');
        this.error = error.error.message;
      }
    );
  }
  logout() {
    // Supprimez le token de localStorage et redirigez l'utilisateur vers la page de connexion
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  onForgotPassword() {
    const { username } = this.loginForm.value;
    // Remplacez 'S2Service' par le nom de votre service
    this.S2Service.forgotPassword(username).subscribe(
      response => {
        // Demande de réinitialisation de mot de passe envoyée
        console.log(response);
      },
      error => {
        // Erreur de réinitialisation de mot de passe
        console.error(error);
       }
    );
  }
}



