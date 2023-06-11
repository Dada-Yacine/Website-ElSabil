import { Component } from '@angular/core';
import { Year } from '../year';
import { SyearService } from '../services/syear.service';
import { Ayear } from '../../ayear/ayear';
import { SayearService } from '../../ayear/services/sayear.service';
import { Level } from '../../level/level';
import { SLevelService } from '../../level/services/slevel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yeartable',
  templateUrl: './yeartable.component.html',
  styleUrls: ['./yeartable.component.css']
})
export class YeartableComponent {

  constructor(
    private yearService:SyearService,
    private ayearService:SayearService,
    private LevelService:SLevelService,
    private router:Router
    ) { }

  YearsData: Year[] = [];

  anneeScolaireId:number = 0;
  niveauId:number = 0;
  DataAYear: Ayear[] = [];
  DataLevel: Level[] = [];

  ngOnInit(): void {
    this.yearService.getallyears().subscribe(
          Data => {
            this.YearsData = Data;
        }
    );

    this.ayearService.getallayears().subscribe(
        Data => {
          this.DataAYear = Data;
      }
    );

    this.LevelService.getalllevels().subscribe(
        Data => {
          this.DataLevel = Data;
      }
    );

  }

  deleteyear(id: number):void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce niveau ?')){
      this.yearService.deleteyear(id).subscribe(
        () => {
            this.YearsData = this.YearsData.filter(y => y.anneeId !== id);
        }
      );
    }
  }

  getyearIDS(anneeId:number, anneeScolaireNom:String, niveauNom:String):void {
    const yearselected = this.DataAYear.find(ayear => ayear.nom === anneeScolaireNom);
    const levelselected = this.DataLevel.find(level => level.niveauNom === niveauNom);
    this.router.navigate(['/admin/annee/', anneeId, yearselected?.id , levelselected?.niveauId, 'modify']);
  }

}
