import { Component, OnInit } from '@angular/core';
import { annee } from '../models/annee.model';
import { Adresse, Etudiants } from '../models/etudiants.model';
import { group } from '../models/group.model';
import { niveau } from '../models/niveau.model';
import { EtudiantserviceService } from '../services/etudiantservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  //nouvelEtudiant: Etudiants = new Etudiants();
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
    groupe: '',
    idgroupe:0,
    idannee:0,
    idniveau:0,
  };



  selectedNiveau!: niveau ;
  selectedAnnee!: annee ;
  selectedGroupe!: group ;
  niveaux: niveau[] = [];
  annees: annee[] = [];
 groupes: group[] = [];
  constructor(
    private etudiantService: EtudiantserviceService,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.getNiveaux();
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


  getNiveaux() {
    this.http.get<niveau[]>('http://localhost:8080/niveaux').subscribe(
      (response) => {
        this.niveaux = response;
        console.log(this.niveaux);
        // Sélectionnez le premier niveau par défaut
        if (this.niveaux.length > 0) {
          this.selectedNiveau = this.niveaux[0];
          this.getAnnees();
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des niveaux:', error);
      }
    );
  }

  getAnnees() {
    if (this.selectedNiveau && this.selectedNiveau.niveauId) {
      const niveauIdStr = this.selectedNiveau.niveauId.toString(); // Convertir l'ID du niveau en chaîne de caractères
      this.http.get<any[]>(`http://localhost:8080/niveaux/${niveauIdStr}/annees`).subscribe(
        (response) => {
          this.annees = response.map(item => {
            return { anneeId: item.anneeId, anneeNom: item.anneeNom };
          });
        },
        (error) => {
          console.error('Erreur lors de la récupération des années:', error);
        }
      );
    } else {
      this.annees = [];
    }
  }

  getGroupes(){
    console.log(this.selectedAnnee);
    console.log(this.selectedAnnee.anneeId);
    if (this.selectedAnnee && this.selectedAnnee.anneeId) {
      const anneeIdStr = this.selectedAnnee.anneeId.toString();

      this.http.get<group[]>(`http://localhost:8080/annees/${anneeIdStr}/groupes`).subscribe(
        (response) => {
          this.groupes = response;
          console.log(this.groupes);
        },
        (error) => {
          console.error('Erreur lors de la récupération des groupes:', error);
        }
      );
    } else {
      this.groupes = [];
      console.log("vide");
    }
  }
  ajouterEtudiant() {
    // const niveauIdStr = this.selectedNiveau.toString(); // Convertir l'ID du niveau en chaîne de caractères
  this.nouvelEtudiant.annee=this.selectedAnnee.anneeNom;
  this.nouvelEtudiant.niveau=this.selectedNiveau.niveauNom;
  this.nouvelEtudiant.groupe=this.selectedGroupe.groupeNom;
  this.nouvelEtudiant.idgroupe=this.selectedGroupe.groupeId; 
  this.nouvelEtudiant.idannee=this.selectedAnnee.anneeId; 
  this.nouvelEtudiant.idniveau=this.selectedNiveau.niveauId;
  console.log(this.selectedGroupe.groupeNom);
     this.etudiantService
       .ajouterEtudiant(this.nouvelEtudiant)
       .subscribe({
         next: () => {
           // Connexion réussie
           console.log('ajouté');
           this.router.navigate(['/admin/etuList']);
         },
         error: (error) => {
           console.log("ths is error");
           // Erreur de connexion
           console.log(error);
         },
       });
   }


}
