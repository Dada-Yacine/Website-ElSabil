import { Component } from '@angular/core';
import { SayearService } from '../../ayear/services/sayear.service';
import { SyearService } from '../../year/services/syear.service';
import { SLevelService } from '../../level/services/slevel.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Year } from '../../year/year';
import { Course } from '../course';
import { SteacherService } from '../../servicestest/steacher.service';
import { Teacher } from '../../servicestest/teacher';
import { ScourseService } from '../services/scourse.service';

@Component({
  selector: 'app-coursemodify',
  templateUrl: './coursemodify.component.html',
  styleUrls: ['./coursemodify.component.css']
})
export class CoursemodifyComponent {



  constructor(
    private route: ActivatedRoute,
    private teacherService:SteacherService,
    private yearService:SyearService,
    private ayearService:SayearService,
    private LevelService:SLevelService,
    private router:Router,
    private courseService:ScourseService,
    ) { }


  activeIDs: number[] = [];
  activeData: Course |  null = null;

  DataTeacher: Teacher[] = [];
  autoTeacherValue!: number;
  DataYear: Year[] = [];
  autoYearValue!: number;

  ngOnInit(): void {

    this.DataTeacher = this.teacherService.getallteachers();

    this.yearService.getallyears().subscribe(
          Data => {
            this.DataYear = Data;
         }
    );

    this.activeIDs = [
      this.route.snapshot.params['coursId'],
      this.route.snapshot.params['annneeID'],
    ];

    this.courseService.getcourse(this.activeIDs[0]).subscribe(
      (data: Course) => {
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
      this.courseService.updatecourse(this.coursId, this.annneeID, Data).subscribe(
        ()=>{
          this.router.navigate(['/admin/course']);
        }
      );
    } else {confirm('Il y a des champs vides, assurez-vous de mettre les données correctement !')}
  }



}
