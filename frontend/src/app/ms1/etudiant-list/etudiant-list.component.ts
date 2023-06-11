import { Component } from '@angular/core';
import { Etudiants } from '../models/etudiants.model';
import { EtudiantserviceService } from '../services/etudiantservice.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css'],

})
export class EtudiantListComponent   {
  etudiants!: Etudiants[];

  constructor(private etudiantService: EtudiantserviceService,private router: Router) { }

  ngOnInit() {
    this.getEtudiantsEtudiantRole();
  }

  getEtudiantsEtudiantRole(): void {
    this.etudiantService.getEtudiants().subscribe(etudiants => {
      // Filtrer les étudiants ayant le rôle "etudiant"
      this.etudiants = etudiants.filter(etudiant => etudiant.role === 'etudiant');
    });
  }

  supprimerEtudiant(id: number,role:String) {
    this.etudiantService.supprimerEtudiant(id,role).subscribe(() => {
      this.getEtudiantsEtudiantRole();
    });
  }
 /* modifierEtudiant(id: number): void {
    this.router.navigate(['/etuMod', id]);
  }*/

}
