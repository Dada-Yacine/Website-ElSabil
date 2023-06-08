import { Component } from '@angular/core';
import { SayearService } from '../services/sayear.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ayearcreate',
  templateUrl: './ayearcreate.component.html',
  styleUrls: ['./ayearcreate.component.css']
})
export class AyearcreateComponent {


  constructor(private ayearService:SayearService, private router:Router) { }

  nom:String = '';

  getNom(nom:string):void {

    this.nom=nom;

    const Data = {
      nom: this.nom,
    }

    if ( this.nom!=='' ) {
      this.ayearService.createayear(Data).subscribe(
        ()=>{
          this.router.navigate(['/admin/anneescholaire']);
        }
      );
    } else {confirm('Il y a des champs vides, assurez-vous de mettre les données correctement !')}
  }


}
