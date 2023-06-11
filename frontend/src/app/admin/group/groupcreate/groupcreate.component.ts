import { Component } from '@angular/core';
import { Teacher } from '../../servicestest/teacher';
import { SyearService } from '../../year/services/syear.service';
import { SgroupService } from '../services/sgroup.service';
import { Router } from '@angular/router';
import { Year } from '../../year/year';

@Component({
  selector: 'app-groupcreate',
  templateUrl: './groupcreate.component.html',
  styleUrls: ['./groupcreate.component.css']
})
export class GroupcreateComponent {


  constructor(
    private yearService:SyearService,
    private groupService:SgroupService,
    private router:Router) { }

  DataYear: Year[] = [];
  autoYearValue: string = 'Auto';

  ngOnInit(): void {

    this.yearService.getallyears().subscribe(
          Data => {
            this.DataYear = Data;
         }
    );
  }

  updateValueIdAnnee(selectedValue: string): void {
    const selectedYear = this.DataYear.find(year => year.anneeNom === selectedValue);

    if (selectedYear) {
      // Update the autoValue with the selected ID
      this.autoYearValue = selectedYear.anneeId.toString();
    } else {
      // Reset to 'Auto' if no selection or invalid value
      this.autoYearValue = 'Auto';
    }
  }


  nomGroupe:string = '';
  nombreEtudiants:number = 0;
  annneeID:number = 0;
  anneeNom:String = '';
  nombreMaxEtudiants:number = 0;


  getValues(anneeNom:string, nomGroupe:string, nombreMaxEtudiants:string):void {




    this.nomGroupe= nomGroupe;
    this.nombreEtudiants= 0;
    this.nombreMaxEtudiants=Number(nombreMaxEtudiants);
    this.anneeNom=anneeNom;
    this.annneeID=Number(this.autoYearValue);

    const Data = {
      nomGroupe: this.nomGroupe,
      nombreEtudiants: this.nombreEtudiants,
      nombreMaxEtudiants: this.nombreMaxEtudiants,
      anneeNom: this.anneeNom,
      annneeID: this.annneeID,
    }


    if (
      this.nomGroupe!=='' &&
      this.nombreMaxEtudiants!== 0 &&
      this.autoYearValue!=='Auto' &&
      this.anneeNom!=='default') {
      this.groupService.creategroup(this.annneeID, Data).subscribe(
        ()=>{
          this.router.navigate(['/admin/group']);
        }
      );
    } else {confirm('Il y a des champs vides, assurez-vous de mettre les données correctement !')}
  }



}
