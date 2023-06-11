import { Component } from '@angular/core';
import { SyearService } from '../services/syear.service';
import { Ayear } from '../../ayear/ayear';
import { SayearService } from '../../ayear/services/sayear.service';
import { Level } from '../../level/level';
import { SLevelService } from '../../level/services/slevel.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Year } from '../year';


@Component({
  selector: 'app-yearmodify',
  templateUrl: './yearmodify.component.html',
  styleUrls: ['./yearmodify.component.css']
})
export class YearmodifyComponent {

  constructor(
    private route: ActivatedRoute,
    private yearService:SyearService,
    private ayearService:SayearService,
    private LevelService:SLevelService,
    private router:Router
    ) { }


  activeIDs: number[] = [];
  activeData: Year |  null = null;

  DataAYear: Ayear[] = [];
  autoAYearValue!: number;
  DataLevel: Level[] = [];
  autoLevelValue!: number;

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

    this.activeIDs = [
      this.route.snapshot.params['anneeId'],
      this.route.snapshot.params['anneeScolaireId'],
      this.route.snapshot.params['niveauId']
    ];

    this.yearService.getyear(this.activeIDs[0]).subscribe(
      (data: Year) => {
        this.activeData = {
          niveauId: this.activeIDs[2],
          anneeScolaireId: this.activeIDs[1],
          anneeId: data.anneeId,
          anneeNom: data.anneeNom,
          nombreEtudiants: data.nombreEtudiants,
          nombreMaxEtudiants: data.nombreMaxEtudiants,
          niveauNom: data.niveauNom,
          anneeScolaireNom: data.anneeScolaireNom,
        };
      }
    );

  }

  updateValueIdAyear(selectedValue: string): void {
    const selectedAyear = this.DataAYear.find(ayear => ayear.nom === selectedValue);

    if (selectedAyear && this.activeData) {
      // Update the autoValue with the selected ID
      this.autoAYearValue = selectedAyear.id;
      this.activeData.anneeScolaireId = this.autoAYearValue;
    }
  }

  updateValueIdLevel(selectedValue: string): void {
    const selectedAyear = this.DataLevel.find(level => level.niveauNom === selectedValue);

    if (selectedAyear && this.activeData) {
      // Update the autoValue with the selected ID
      this.autoLevelValue = selectedAyear.niveauId;
      this.activeData.niveauId = this.autoLevelValue;
    }
  }

  anneeScolaireId!:number;
  anneeScolaireNom:String = '';
  niveauId!:number;
  niveauNom:String = '';
  anneeId!:number;
  anneeNom:String = '';
  nombreEtudiants!:number;
  nombreMaxEtudiants:number = 0;

  getValues(anneeId:string, anneeScolaireId:string, niveauId:string, nombreEtudiants:string,
    anneeScolaireNom:string, niveauNom:string, anneeNom:string, nombreMaxEtudiants:string):void {


    this.anneeScolaireId=Number(anneeScolaireId);
    this.anneeScolaireNom=anneeScolaireNom;
    this.niveauId=Number(niveauId);
    this.niveauNom=niveauNom;
    this.anneeId=Number(anneeId);
    this.anneeNom=anneeNom;
    this.nombreMaxEtudiants=Number(nombreMaxEtudiants);
    this.nombreEtudiants=Number(nombreEtudiants);

    const Data = {
      anneeNom: this.anneeNom,
      nombreEtudiants: this.nombreEtudiants,
      nombreMaxEtudiants: this.nombreMaxEtudiants,
      niveauId: this.niveauId,
      niveauNom: this.niveauNom,
      anneeScolaireId: this.anneeScolaireId,
      anneeScolaireNom: this.anneeScolaireNom
    }

    if (
      this.anneeNom!=='' &&
      this.nombreMaxEtudiants!== 0 ) {
      this.yearService.updateyear(this.anneeId, this.anneeScolaireId, this.niveauId, Data).subscribe(
        ()=>{
          this.router.navigate(['/admin/annee']);
        }
      );
    } else {confirm('Il y a des champs vides, assurez-vous de mettre les données correctement !')}
  }

}
