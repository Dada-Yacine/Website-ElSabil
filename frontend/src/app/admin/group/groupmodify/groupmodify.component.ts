import { Component } from '@angular/core';
import { SgroupService } from '../services/sgroup.service';
import { SyearService } from '../../year/services/syear.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Year } from '../../year/year';
import { Group } from '../group';
import { SstudentService } from '../../servicestest/sstudent.service';
import { Student } from '../../servicestest/student';

@Component({
  selector: 'app-groupmodify',
  templateUrl: './groupmodify.component.html',
  styleUrls: ['./groupmodify.component.css']
})
export class GroupmodifyComponent {

/*
  constructor(
    private route: ActivatedRoute,
    private studentService:SstudentService,
    private yearService:SyearService,
    private router:Router,
    private groupService:SgroupService,
    ) { }


  activeIDs: number[] = [];
  activeData: Group |  null = null;

  DataStudents: Student[] = [];
  autoTeacherValue!: number;
  DataYear: Year[] = [];
  autoYearValue!: number;

  ngOnInit(): void {


    this.yearService.getallyears().subscribe(
          Data => {
            this.DataYear = Data;
         }
    );

    this.activeIDs = [
      this.route.snapshot.params['coursId'],
      this.route.snapshot.params['annneeID'],
    ];

    this.DataStudents = this.studentService.getallstudentsbydroupId(this.activeIDs[0]);

    this.groupService.getgroup(this.activeIDs[0]).subscribe(
      (data: Group) => {
        this.activeData = {
          annneeID: this.activeIDs[1],
          anneeNom: data.anneeNom,
          enseigantNom: data.enseigantNom,
          enseignantId: data.enseignantId,
          coursCoef: data.coursCoef,
          coursNom: data.coursNom,
          coursId: this.activeIDs[0],
        };
      }
    );

  }

  updateValueIdATeacher(selectedValue: string): void {
    const selectedteacher = this.DataTeacher.find(teacher => teacher.nom === selectedValue);

    if (selectedteacher && this.activeData) {
      // Update the autoValue with the selected ID
      this.autoTeacherValue = selectedteacher.id;
      this.activeData.enseignantId = this.autoTeacherValue;
    }
  }

  updateValueIdAnnee(selectedValue: string): void {
    const selectedYear = this.DataYear.find(year => year.anneeNom === selectedValue);

    if (selectedYear && this.activeData) {
      // Update the autoValue with the selected ID
      this.autoYearValue = selectedYear.anneeId;
      this.activeData.annneeID = this.autoYearValue;
    }
  }

  coursId!:number;
  coursNom:String = '';
  coursCoef!:number;
  enseigantNom:String = '';
  enseignantId:String = '';
  annneeID!:number;
  anneeNom:string = '';

  getValues(coursId:string, enseignantId:string, annneeID:string,
    coursNom:string, enseigantNom:string, anneeNom:string, coursCoef:string):void {


    this.enseignantId=enseignantId;
    this.coursNom=coursNom;
    this.annneeID=Number(annneeID);
    this.enseigantNom=enseigantNom;
    this.coursId=Number(coursId);
    this.anneeNom=anneeNom;
    this.coursCoef=Number(coursCoef);

    const Data = {
      anneeNom: this.anneeNom,
      coursCoef: this.coursCoef,
      annneeID: this.annneeID,
      enseigantNom: this.enseigantNom,
      enseignantId: this.enseignantId,
      coursNom: this.coursNom
    }

    if (
      this.coursNom!=='' &&
      this.coursCoef!== 0 ) {
      this.groupService.updategroup(this.coursId, this.annneeID, Data).subscribe(
        ()=>{
          this.router.navigate(['/admin/group']);
        }
      );
    } else {confirm('Il y a des champs vides, assurez-vous de mettre les données correctement !')}
  }

*/

}
