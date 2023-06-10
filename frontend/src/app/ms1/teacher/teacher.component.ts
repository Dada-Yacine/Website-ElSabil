import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../models/Etudiant.model';
import { cours } from '../models/cours.model';
import { niveau } from '../models/niveau.model';
import { annee } from '../models/annee.model';
import { group } from '../models/group.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Etudiants } from '../models/etudiants.model';
import { EtudiantserviceService } from '../services/etudiantservice.service';




@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  nouvelEtudiant: Etudiants = {
    id: 0,
    nom: '',
    prenom: '',
    dateNaissance: new Date(),
    wilaya: '',
    ville: '',
    rue: '',
    adresse: {
      wilaya: '',
      ville: '',
      rue: ''
    },
    numeroTelephone: '',
    email: '',
    motDePasse: '',
    role: '',
    active: '',
    niveau: '',
    annee: '',
    groupe: ''
  };
  selectedCours!: cours[];
  selectedNiveau!: niveau;
  selectedAnnee!: annee;
  selectedGroupe!: group;
  niveaux: niveau[] = [];
  annees: annee[] = [];
 groupes: group[] = [];
  cours: cours[] = [];

  constructor(
    private etudiantService: EtudiantserviceService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getNiveaux();
  }
  getNiveaux() {
    this.http.get<niveau[]>('http://localhost:9050/api/niveau').subscribe(
      (response) => {
        this.niveaux = response;
        console.log(this.niveaux);
        // Sélectionnez le premier niveau par défaut
        if (this.niveaux.length > 0) {
          this.selectedNiveau = this.niveaux[0];
          this.getAnnees();
          console.log(  this.selectedNiveau);
          console.log("asdrtyuio");
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des niveaux:', error);
      }
    );
  }
  get adresseWilaya(): string | undefined {
    return this.nouvelEtudiant.adresse?.wilaya;
  }
  set adresseWilaya(value: string | undefined) {
    if (this.nouvelEtudiant.adresse) {
      this.nouvelEtudiant.adresse.wilaya = value;
    }
  }
  get adresseVille(): string | undefined {
    return this.nouvelEtudiant.adresse?.ville;
  }

  set adresseVille(value: string | undefined) {
    if (this.nouvelEtudiant.adresse) {
      this.nouvelEtudiant.adresse.ville = value;
    }
  }

  get adresseRue(): string | undefined {
    return this.nouvelEtudiant.adresse?.rue;
  }

  set adresseRue(value: string | undefined) {
    if (this.nouvelEtudiant.adresse) {
      this.nouvelEtudiant.adresse.rue = value;}
    }

  getAnnees() {
    if (this.selectedNiveau && this.selectedNiveau.niveauId) {
      const niveauIdStr = this.selectedNiveau.niveauId.toString(); // Convertir l'ID du niveau en chaîne de caractères
      this.http.get<any[]>(`http://localhost:9050/api/${niveauIdStr}/annees`).subscribe(
        (response) => {
          this.annees = response.map(item => {
            return { id: item.id, anneeNom: item.anneeNom };

          });
        },
        (error) => {
          console.error('Erreur lors de la récupération des années:', error);
        }
      );
    } else {
      this.annees = [];
      console.log(this.annees);
    }
  }



  ajouterEtudiant() {
  // const niveauIdStr = this.selectedNiveau.toString(); // Convertir l'ID du niveau en chaîne de caractères
  this.nouvelEtudiant.annee=this.selectedAnnee.anneeNom;
  this.nouvelEtudiant.niveau=this.selectedNiveau.niveauNom;


     this.etudiantService
       .ajouterEtudiant(this.nouvelEtudiant)
       .subscribe({
         next: () => {
           // Connexion réussie
           console.log('ajouté');
           this.router.navigate(['/teacherlist']);
         },
         error: (error:any) => {
           // Erreur de connexion
           console.log(error);
         },
       });
  }
}
