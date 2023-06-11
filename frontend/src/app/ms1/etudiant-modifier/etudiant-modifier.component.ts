import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { annee } from '../models/annee.model';
import { Etudiants } from '../models/etudiants.model';
import { group } from '../models/group.model';
import { niveau } from '../models/niveau.model';
import { EtudiantserviceService } from '../services/etudiantservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-etudiant-modifier',
  templateUrl: './etudiant-modifier.component.html',
  styleUrls: ['./etudiant-modifier.component.css']
})
export class EtudiantModifierComponent {
  etudiant!: Etudiants;
  etudiantId!: number;
  selectedNiveau: niveau | undefined;
  selectedAnnee: annee | undefined;
  selectedGroupe: group | undefined;
  niveaux: niveau[] = [];
  annees: annee[] = [];
  groupes: group[] = [];

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

  getNiveaux() {
    this.http.get<niveau[]>('http://localhost:8080/niveaux').subscribe(
      (response:any) => {
        this.niveaux = response;
        this.selectedNiveau = this.niveaux.find(niveau => niveau.niveauNom === this.etudiant?.niveau);
        this.getAnnees();
      },
      (error:any) => {
        console.error('Erreur lors de la récupération des niveaux:', error);
      }
    );
  }

  getAnnees() {
    if (this.selectedNiveau && this.selectedNiveau.niveauId) {
      const niveauIdStr = this.selectedNiveau.niveauId.toString();
      this.http.get<any[]>(`http://localhost:8080/niveaux/${niveauIdStr}/annees`).subscribe(
        (response:any) => {
          this.annees = response.map((item: { anneeId: any; anneeNom: any; }) => {
            return { anneeId: item.anneeId, anneeNom: item.anneeNom };
          });
          this.selectedAnnee = this.annees.find(annee => annee.anneeNom === this.etudiant?.annee);
          this.getGroupes();
        },
        (error:any) => {
          console.error('Erreur lors de la récupération des années:', error);
        }
      );
    } else {
      this.annees = [];
    }
  }

  getGroupes() {
    if (this.selectedAnnee && this.selectedAnnee.anneeId) {
      const anneeIdStr = this.selectedAnnee.anneeId.toString();

      this.http.get<group[]>(`http://localhost:8080/annees/${anneeIdStr}/groupes`).subscribe(
        (response:any) => {
          this.groupes = response;
          this.selectedGroupe = this.groupes.find(groupe => groupe.groupeNom === this.etudiant?.groupe);
        },
        (error:any) => {
          console.error('Erreur lors de la récupération des groupes:', error);
        }
      );
    } else {
      this.groupes = [];
    }
  }

  modifierEtudiant() {
    if (this.etudiant) {
      this.etudiant.niveau = this.selectedNiveau?.niveauNom;
      this.etudiant.annee = this.selectedAnnee?.anneeNom;
      this.etudiant.groupe = this.selectedGroupe?.groupeNom;
      this.etudiant.idannee=this.selectedAnnee?.anneeId 
      this.etudiant.idniveau=this.selectedNiveau?.niveauId 
     this.etudiant.idgroupe=this.selectedGroupe?.groupeId
      this.http.patch(`http://localhost:9040/api/etudiants/${this.etudiantId}`, this.etudiant).subscribe(
        () => {
          console.log('Modifié');
          this.router.navigate(['/etuList']);
        },
        (error:any) => {
          console.error('Erreur lors de la modification de l\'étudiant:', error);
        }
      );
    }
  }

}
