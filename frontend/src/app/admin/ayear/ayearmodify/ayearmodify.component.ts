import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Ayear } from '../ayear';
import { SayearService } from '../services/sayear.service';

@Component({
  selector: 'app-ayearmodify',
  templateUrl: './ayearmodify.component.html',
  styleUrls: ['./ayearmodify.component.css']
})
export class AyearmodifyComponent {

  constructor(private route: ActivatedRoute, private ayearService:SayearService,  private router:Router) { }

  activeID:number = 0;
  activeData: Ayear |  null = null;

  ngOnInit(): void {
    this.activeID = this.route.snapshot.params['id'];

    this.ayearService.getayear(this.activeID).subscribe(
      (data: Ayear) => {
        this.activeData = data;
      }
    );
  }

  id: number = 0;
  nom: string = '';

  getallvalues(id:string, nom:string):void {

    this.id=Number(id);
    this.nom=nom;


    const Data = {
      nom: this.nom,
    }

    if ( this.nom!=='' ) {
      this.ayearService.updateayear(this.id,Data).subscribe(
        ()=>{
          this.router.navigate(['/admin/anneescholaire']);
        }
      );
    } else {confirm('Il y a des champs vides, assurez-vous de mettre les données correctement !')}
  }

}
