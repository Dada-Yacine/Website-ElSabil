import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IEvent } from '../models/event.model';
import { EventService } from '../services/event.service';
import { MsService } from '../services/ms.service';
import { S2Service } from 'src/app/ms1/services/s2.service';

@Component({
  selector: 'app-student-events',
  templateUrl: './student-events.component.html',
  styleUrls: ['./student-events.component.css']
})
export class StudentEventsComponent implements OnInit{
  events:IEvent[] = [];
  id:number;
  constructor(private eventService:EventService, private changeDetection: ChangeDetectorRef,private msService:MsService,
    private auth:S2Service){
      this.id = Number.parseInt(auth.getUserId());
    this.msService.getStudent(this.id.toString()).subscribe((res:any)=>{
      this.get(res.idannee);
    })
  }

  ngOnInit() {
  }
  get(id:string){
    this.eventService.getEventsByAnnee(id).subscribe((res:any)=>{
      this.events = res;
      this.changeDetection.detectChanges()
    })
  }
}
