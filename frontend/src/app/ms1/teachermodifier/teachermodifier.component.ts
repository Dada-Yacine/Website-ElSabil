import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { annee } from '../models/annee.model';
import { Etudiants } from '../models/etudiants.model';
import { group } from '../models/group.model';
import { niveau } from '../models/niveau.model';
import { EtudiantserviceService } from '../services/etudiantservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teachermodifier',
  templateUrl: './teachermodifier.component.html',
  styleUrls: ['./teachermodifier.component.css']
})
export class TeachermodifierComponent  implements OnInit{
  etudiant!: Etudiants;
  etudiantId!: number;
  selectedNiveau: niveau | undefined;
  selectedAnnee: annee | undefined;
  selectedGroupe: group | undefined;
  niveaux!: niveau[]  ;
  annees!: annee[];
  groupes: group[] | undefined ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private etudiantService: EtudiantserviceService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.etudiantId = +params['id'];
      this.getNiveaux();
      this.getEtudiantById(); // Appeler la fonction pour récupérer l'étudiant
    });
  }

  getEtudiantById() {
    this.http.get<Etudiants>(`http://localhost:9040/api/etudiants/${this.etudiantId}`).subscribe(
      (etudiant) => {
        this.etudiant = etudiant;
        this.selectedNiveau = this.niveaux.find(niveau => niveau.niveauNom === etudiant.niveau);
        this.selectedAnnee = this.annees.find(annee => annee.anneeNom === etudiant.annee);
        this.getAnnees();
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'étudiant:', error);
      }
    );
  }
  get adresseWilaya(): string | undefined {
    return this.etudiant.adresse?.wilaya;
  }
  set adresseWilaya(value: string | undefined) {
    if (this.etudiant.adresse) {
      this.etudiant.adresse.wilaya = value;
    }
  }
  get adresseVille(): string | undefined {
    return this.etudiant.adresse?.ville;
  }

  set adresseVille(value: string | undefined) {
    if (this.etudiant.adresse) {
      this.etudiant.adresse.ville = value;
    }
  }

  get adresseRue(): string | undefined {
    return this.etudiant.adresse?.rue;
  }

  set adresseRue(value: string | undefined) {
    if (this.etudiant.adresse) {
      this.etudiant.adresse.rue = value;}
    }

  getNiveaux() {
    this.http.get<niveau[]>('http://localhost:9050/api/niveau').subscribe(
      (response) => {
        this.niveaux = response;
        this.selectedNiveau = this.niveaux.find(niveau => niveau.niveauNom === this.etudiant?.niveau);
        this.getAnnees();
      },
      (error) => {
        console.error('Erreur lors de la récupération des niveaux:', error);
      }
    );
  }

  getAnnees() {
    if (this.selectedNiveau && this.selectedNiveau.niveauId) {
      const niveauIdStr = this.selectedNiveau.niveauId.toString();
      this.http.get<any[]>(`http://localhost:9050/api/${niveauIdStr}/annees`).subscribe(
        (response) => {
          this.annees = response.map(item => {
            return { anneeId: item.id, anneeNom: item.anneeNom };
          });
          this.selectedAnnee = this.annees.find(annee => annee.anneeNom === this.etudiant?.annee);

        },
        (error) => {
          console.error('Erreur lors de la récupération des années:', error);
        }
      );
    } else {
      this.annees = [];
    }
  }



  modifierEtudiant() {
    if (this.etudiant) {
      this.etudiant.niveau = this.selectedNiveau?.niveauNom;
      this.etudiant.annee = this.selectedAnnee?.anneeNom;
      this.etudiant.groupe = this.selectedGroupe?.groupeNom;

      this.http.patch(`http://localhost:9040/api/etudiants/${this.etudiantId}`, this.etudiant).subscribe(
        (response) => {
          console.log('Modifié');
          this.router.navigate(['/teacherlist']);
        },
        (error) => {
          console.error('Erreur lors de la modification de l\'étudiant:', error);
        }
      );
    }
  }


}
