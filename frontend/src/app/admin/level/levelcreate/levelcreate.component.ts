import { Component } from '@angular/core';
import { SLevelService } from '../services/slevel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-levelcreate',
  templateUrl: './levelcreate.component.html',
  styleUrls: ['./levelcreate.component.css']
})
export class LevelcreateComponent {


  constructor(private LevelService:SLevelService, private router:Router) { }

  niveauNom:String = '';
  nombreMaxDetudiants:number = 0;

  getNomAndMaxEtdValue(nom:string, maxetd:string):void {

    this.niveauNom=nom;
    this.nombreMaxDetudiants=Number(maxetd);

    const Data = {
      niveauNom: this.niveauNom,
      nombreDetudiants: 0,
      nombreMaxDetudiants: this.nombreMaxDetudiants,
    }

    if ( this.niveauNom!=='' && this.nombreMaxDetudiants!== 0 ) {
      this.LevelService.createlevel(Data).subscribe(
        ()=>{
          this.router.navigate(['/admin/niveau']);
        }
      );
    } else {confirm('Il y a des champs vides, assurez-vous de mettre les données correctement !')}
  }

}
