import { Component } from '@angular/core';
import { Course } from '../course';
import { ScourseService } from '../services/scourse.service';
import { Year } from '../../year/year';
import { SyearService } from '../../year/services/syear.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coursetable',
  templateUrl: './coursetable.component.html',
  styleUrls: ['./coursetable.component.css']
})
export class CoursetableComponent {

  constructor(
    private courseService:ScourseService,
    private yearService:SyearService,
    private router:Router
    ) { }

  coursesData: Course[] = [];

  anneeScolaireId:number = 0;
  DataYear: Year[] = [];

  ngOnInit(): void {
    this.courseService.getallcourses().subscribe(
          Data => {
            this.coursesData = Data;
        }
    );

    this.yearService.getallyears().subscribe(
      Data => {
        this.DataYear = Data;
    }
  );
  }

  deletecourse(id: number):void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')){
      this.courseService.deletecourse(id).subscribe(
        () => {
            this.coursesData = this.coursesData.filter(y => y.coursId !== id);
        }
      );
    }
  }


  getcourseIDS(coursId:number, anneeNom:String):void {
    const yearselected = this.DataYear.find(year => year.anneeNom === anneeNom);
    this.router.navigate(['/admin/course/', coursId, yearselected?.anneeId, 'modify']);
  }


}
