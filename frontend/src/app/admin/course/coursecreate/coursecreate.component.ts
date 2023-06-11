import { Component } from '@angular/core';
import { SteacherService } from '../../servicestest/steacher.service';
import { Teacher } from '../../servicestest/teacher';
import { SyearService } from '../../year/services/syear.service';
import { ScourseService } from '../services/scourse.service';
import { Router } from '@angular/router';
import { Year } from '../../year/year';

@Component({
  selector: 'app-coursecreate',
  templateUrl: './coursecreate.component.html',
  styleUrls: ['./coursecreate.component.css']
})
export class CoursecreateComponent {

    constructor(
    private teacherService:SteacherService,
    private yearService:SyearService,
    private courseService:ScourseService,
    private router:Router) { }

  DataTeachers: Teacher[] = [];
  autoTeacherValue: string = 'Auto';
  DataYear: Year[] = [];
  autoYearValue: string = 'Auto';

  ngOnInit(): void {
    this.DataTeachers = this.teacherService.getallteachers();

    this.yearService.getallyears().subscribe(
          Data => {
            this.DataYear = Data;
         }
    );
  }

  updateValueIdATeacher(selectedValue: string): void {
    const selectedAyear = this.DataTeachers.find(teacher => teacher.nom === selectedValue);

    if (selectedAyear) {
      // Update the autoValue with the selected ID
      this.autoTeacherValue = selectedAyear.id.toString();
    } else {
      // Reset to 'Auto' if no selection or invalid value
      this.autoTeacherValue = 'Auto';
    }
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


  enseigantId:number=0;
  enseigantNom:string = '';
  coursCoef:number = 0;
  coursNom:String = '';
  anneeNom:String = '';
  annneeID:number = 0;

  getValues(enseigantNom:string, anneeNom:string, coursNom:string, coursCoef:string):void {



    this.enseigantId=Number(this.autoTeacherValue);
    this.enseigantNom= enseigantNom;
    this.coursCoef=Number(coursCoef);
    this.coursNom = coursNom;
    this.annneeID=Number(this.autoYearValue);
    this.anneeNom=anneeNom;

    const Data = {
      coursNom: this.coursNom,
      coursCoef: this.coursCoef,
      enseignantId: this.enseigantId,
      enseigantNom: this.enseigantNom,
      anneeNom: this.anneeNom,
      annneeID: this.annneeID,
    }

    if (
      this.coursNom!=='' &&
      this.coursCoef!== 0 &&
      this.autoYearValue!=='Auto' &&
      this.enseigantNom!=='default' &&
      this.autoTeacherValue!=='Auto' &&
      this.anneeNom!=='default') {
      this.courseService.createcourse(this.annneeID, Data).subscribe(
        ()=>{
          this.router.navigate(['/admin/course']);
        }
      );
    } else {confirm('Il y a des champs vides, assurez-vous de mettre les données correctement !')}
  }


}
