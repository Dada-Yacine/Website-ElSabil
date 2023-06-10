import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../services/event.service';
import { Event, IEvent } from '../models/event.model';
import { MsService } from '../services/ms.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent  implements OnInit{
  minDate!:string;
  maxDate!:string;
  event_id!:string;
  events:IEvent[] = []
  ModalAdd:boolean = false
  @ViewChild("img") image!:any

  @ViewChild('eventForm') eventForm!: NgForm;
  showModal: boolean = false;
  levels:any = [];
  yearsList:any = [];
  yearsByLevelList:any = []
  constructor(private eventService:EventService, private changeDetection: ChangeDetectorRef,private ms:MsService){
    ms.getAcademicYears().subscribe((res:any)=>{
      let dates = ms.getLastAcademicYear(res);
      this.minDate = dates.min;
      this.maxDate = dates.max;
    })
  }
  ngOnInit() {
    this.get();
    this.getLevels();
  }
  getLevelName(id:any){
    return this.levels.find((item:any)=>{return item.niveauId == id})?.niveauNom;
  }
  getYearName(id:any,list:any){
    return list.find((item:any)=>{return item.anneeId == id})?.anneeNom;
  }
  get(){
    this.eventService.getAll().subscribe((res:any)=>{
      this.events = res;
      for(let e of this.events){
        if(this.yearsByLevelList[Number.parseInt(e.level)]){
          e.yearsNames = [];
          for(let y of e.years){
            e.yearsNames.push(this.getYearName(y,this.yearsByLevelList[Number.parseInt(e.level)]));
          }
          this.changeDetection.detectChanges()
        }else{
          this.ms.getYearsByLevel(e.level).subscribe((res:any)=>{
            this.yearsByLevelList[Number.parseInt(e.level)] = res;
            e.yearsNames = [];
            for(let y of e.years){
              e.yearsNames.push(this.getYearName(y,this.yearsByLevelList[Number.parseInt(e.level)]));
            }
            this.changeDetection.detectChanges()
          })
        }
      }
    })
  }
  delete(id:string|undefined){
    this.eventService.delete(id).subscribe((res)=>{
      this.get();
    })
  }
  show() {
    this.showModal = true
    this.ModalAdd = true
  }
  hide() {
    this.showModal = false
    this.eventForm.resetForm()
    this.yearsList = []
  }
  add(){
    let event = this.getFormData();
    this.eventService.add(event,this.image.nativeElement.files[0]).subscribe((res)=>{
      this.get();
      this.hide()
    })
  }
  save(){
    let event = this.getFormData();
    this.eventService.edit(this.event_id,event,this.image.nativeElement.files[0]).subscribe((res)=>{
      this.get();
      this.hide()
    })
  }
  
  getLevels(){
    this.ms.getLevels().subscribe((res)=>{
      this.levels = res;
      this.changeDetection.detectChanges();
    })
  }
  getYearsByLevel(event:any){
    this.ms.getYearsByLevel(event.target.value).subscribe((res)=>{
      this.yearsList = res;
      this.changeDetection.detectChanges();
    })
  }
  showEditModal(event:IEvent){
    this.ModalAdd = false
    this.event_id = event._id ? event._id : "";
    this.eventForm.controls['title'].setValue(event.title)
    this.eventForm.controls['description'].setValue(event.description)
    this.eventForm.controls['level'].setValue(event.level)
    this.ms.getYearsByLevel(event.level).subscribe((res)=>{
      this.yearsList = res;
      this.changeDetection.detectChanges();
    })
    this.eventForm.controls['years'].setValue(event.years)
    this.eventForm.controls['date'].setValue(event.date.toString().split('T')[0])
    this.eventForm.controls['timeStartH'].setValue(event.start_time.split(':')[0])
    this.eventForm.controls['timeStartM'].setValue(event.start_time.split(':')[1]);
    this.eventForm.controls['timeEndH'].setValue(event.end_time.split(':')[0])
    this.eventForm.controls['timeEndM'].setValue(event.end_time.split(':')[1]);
    this.showModal = true
  }
  getFormData():Event{
    let event = new Event(); 
    event.title = this.eventForm.controls['title'].value;
    event.description = this.eventForm.controls['description'].value;
    event.image_name = "img";
    event.level = this.eventForm.controls['level'].value;
    event.years = this.eventForm.controls['years'].value;
    event.date = this.eventForm.controls['date'].value;
    event.start_time = this.eventForm.controls['timeStartH'].value + ':' + this.eventForm.controls['timeStartM'].value;
    event.end_time = this.eventForm.controls['timeEndH'].value + ':' + this.eventForm.controls['timeEndM'].value;
    console.log(event)
    return event
  }
}
