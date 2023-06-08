import { Component, Input } from '@angular/core';
import { SLevelService } from '../services/slevel.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Level } from '../level';

@Component({
  selector: 'app-levelmodify',
  templateUrl: './levelmodify.component.html',
  styleUrls: ['./levelmodify.component.css']
})
export class LevelmodifyComponent {

  constructor(private route: ActivatedRoute, private LevelService:SLevelService,  private router:Router) { }

  activeID:number = 0;
  activeData: Level |  null = null;

  ngOnInit(): void {
    this.activeID = this.route.snapshot.params['niveauId'];

    this.LevelService.getlevel(this.activeID).subscribe(
      (data: Level) => {
        this.activeData = data;
      }
    );
  }

  niveauId: number = 0;
  niveauNom: string = '';
  nombreDetudiants: number = 0;
  nombreMaxDetudiants: number = 0

  getallvalues(id:string, nom:string, netd:string, nmaxetd:string):void {

    this.niveauId=Number(id);
    this.niveauNom=nom;
    this.nombreDetudiants=Number(netd);
    this.nombreMaxDetudiants=Number(nmaxetd);

    const Data = {
      niveauNom: this.niveauNom,
      nombreDetudiants: this.nombreDetudiants,
      nombreMaxDetudiants: this.nombreMaxDetudiants,
    }

    if ( this.niveauNom!=='' && this.nombreMaxDetudiants!== 0 ) {
      this.LevelService.updatelevel(this.niveauId,Data).subscribe(
        ()=>{
          this.router.navigate(['/admin/niveau']);
        }
      );
    } else {confirm('Il y a des champs vides, assurez-vous de mettre les données correctement !')}
  }

}
