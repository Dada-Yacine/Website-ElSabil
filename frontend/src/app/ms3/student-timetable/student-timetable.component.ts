import { Component,OnInit } from '@angular/core';
import { TimetableService } from '../services/timetable.service';

@Component({
  selector: 'app-student-timetable',
  templateUrl: './student-timetable.component.html',
  styleUrls: ['./student-timetable.component.css']
})
export class StudentTimetableComponent implements OnInit{
  daysOfWeek: String[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  data: any[] = [];
  times: any[] = [];
  days: number[] = [];
  id:number = 14;
  constructor(private timetableService:TimetableService){}
  ngOnInit() {
    this.get(this.id);
  }
  get(id: number) {
    this.data = [];
    this.times = [];
    this.days = [];
    this.timetableService.getTimetableByGroup(id).subscribe((data: any) => {
      let All = this.timetableService.getDataForTable(data);
      this.data = All.sessions;
      this.days = All.days;
      this.times = All.times;
    })
  }
}
