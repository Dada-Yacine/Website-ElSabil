import { Component,OnInit } from '@angular/core';
import { TimetableService } from '../services/timetable.service';
import { MsService } from '../services/ms.service';
import { S2Service } from 'src/app/ms1/services/s2.service';

@Component({
  selector: 'app-student-timetable',
  templateUrl: './student-timetable.component.html',
  styleUrls: ['./student-timetable.component.css']
})
export class StudentTimetableComponent implements OnInit{
  daysOfWeek: String[] = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  data: any[] = [];
  times: any[] = [];
  days: number[] = [];
  id:number;
  constructor(private timetableService:TimetableService,private msService:MsService,
    private auth:S2Service){
      this.id = Number.parseInt(this.auth.getUserId());
    this.msService.getStudent(this.id.toString()).subscribe((res:any)=>{
      this.get(res.idgroupe);
    })
  }
  ngOnInit() {
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
