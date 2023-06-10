import { Component, OnInit } from '@angular/core';
import { Etudiants } from '../models/etudiants.model';
import { EtudiantserviceService } from '../services/etudiantservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent  {
  etudiants!: Etudiants[];

  constructor(private etudiantService:EtudiantserviceService,private router: Router) { }

  ngOnInit() {
    this.getEtudiantsEtudiantRole();
  }

  getEtudiantsEtudiantRole(): void {
    this.etudiantService.getEtudiants().subscribe(etudiants => {
      // Filtrer les étudiants ayant le rôle "etudiant"
      this.etudiants = etudiants.filter(etudiant => etudiant.role === 'enseignant');
    });
  }

  supprimerEtudiant(id: number,role:String) {
    this.etudiantService.supprimerEtudiant(id,role).subscribe(() => {
      this.getEtudiantsEtudiantRole();
    });
  }
  modifierEtudiant(id: number): void {
    this.router.navigate(['/teacherMod', id]);
  }

}


