import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IEvent } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-student-events',
  templateUrl: './student-events.component.html',
  styleUrls: ['./student-events.component.css']
})
export class StudentEventsComponent implements OnInit{
  events:IEvent[] = []
  constructor(private eventService:EventService, private changeDetection: ChangeDetectorRef){}

  ngOnInit() {
    this.get();
  }
  get(){
    this.eventService.getAll().subscribe((res:any)=>{
      this.events = res;
      this.changeDetection.detectChanges()
    })
  }
}
