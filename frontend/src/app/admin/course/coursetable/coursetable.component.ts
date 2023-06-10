import { Component } from '@angular/core';
import { Course } from '../course';
import { ScourseService } from '../services/scourse.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-coursetable',
  templateUrl: './coursetable.component.html',
  styleUrls: ['./coursetable.component.css']
})
export class CoursetableComponent {




  constructor(private courseService:ScourseService, private http:HttpClient) { }
  coursesData: Course[] = [];

  ngOnInit(): void {
    this.courseService.getallcourses().subscribe(
          Data => {
            this.coursesData = Data;
        }
    );
  }

  deletecourse(id: number):void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce niveau ?')){
      this.courseService.deletecourse(id).subscribe(
        () => {
            this.coursesData = this.coursesData.filter(y => y.coursId !== id);
        }
      );
    }
  }


}
