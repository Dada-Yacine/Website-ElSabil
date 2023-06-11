import { Component } from '@angular/core';
import { Ayear } from '../../ayear/ayear';
import { SyearService } from '../services/syear.service';
import { SayearService } from '../../ayear/services/sayear.service';
import { Level } from '../../level/level';
import { SLevelService } from '../../level/services/slevel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yearcreate',
  templateUrl: './yearcreate.component.html',
  styleUrls: ['./yearcreate.component.css']
})
export class YearcreateComponent {

  constructor(
    private yearService:SyearService,
    private ayearService:SayearService,
    private LevelService:SLevelService,
    private router:Router) { }

  DataAYear: Ayear[] = [];
  autoAYearValue: string = 'Auto';
  DataLevel: Level[] = [];
  autoLevelValue: string = 'Auto';

  ngOnInit(): void {
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

  updateValueIdAyear(selectedValue: string): void {
    const selectedAyear = this.DataAYear.find(ayear => ayear.nom === selectedValue);

    if (selectedAyear) {
      // Update the autoValue with the selected ID
      this.autoAYearValue = selectedAyear.id.toString();
    } else {
      // Reset to 'Auto' if no selection or invalid value
      this.autoAYearValue = 'Auto';
    }
  }

  updateValueIdLevel(selectedValue: string): void {
    const selectedAyear = this.DataLevel.find(level => level.niveauNom === selectedValue);

    if (selectedAyear) {
      // Update the autoValue with the selected ID
      this.autoLevelValue = selectedAyear.niveauId.toString();
    } else {
      // Reset to 'Auto' if no selection or invalid value
      this.autoLevelValue = 'Auto';
    }
  }

  anneeScolaireId:number = 0;
  anneeScolaireNom:String = '';
  niveauId:number = 0;
  niveauNom:String = '';
  anneeNom:String = '';
  nombreMaxEtudiants:number = 0;

  getValues(anneeScolaireNom:string, niveauNom:string, anneeNom:string, nombreMaxEtudiants:string):void {



    this.anneeScolaireId=Number(this.autoAYearValue);
    this.anneeScolaireNom=anneeScolaireNom;
    this.niveauId=Number(this.autoLevelValue);
    this.niveauNom=niveauNom;
    this.anneeNom=anneeNom;
    this.nombreMaxEtudiants=Number(nombreMaxEtudiants);

    const Data = {
      anneeNom: this.anneeNom,
      nombreEtudiants: 0,
      nombreMaxEtudiants: this.nombreMaxEtudiants,
      niveauId: this.niveauId,
      niveauNom: this.niveauNom,
      anneeScolaireId: this.anneeScolaireId,
      anneeScolaireNom: this.anneeScolaireNom
    }

    if (
      this.anneeNom!=='' &&
      this.nombreMaxEtudiants!== 0 &&
      this.autoLevelValue!=='Auto' &&
      this.niveauNom!=='default' &&
      this.autoAYearValue!=='Auto' &&
      this.anneeScolaireNom!=='default') {
      this.yearService.createyear(this.anneeScolaireId,this.niveauId, Data).subscribe(
        ()=>{
          this.router.navigate(['/admin/annee']);
        }
      );
    } else {confirm('Il y a des champs vides, assurez-vous de mettre les données correctement !')}
  }



}
