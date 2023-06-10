import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AbsenceService } from '../services/absence.service';
import { MsService } from '../services/ms.service';
import { IAbsence } from '../models/absence.model';
import { TimetableService } from '../services/timetable.service';

@Component({
  selector: 'app-admin-absence',
  templateUrl: './admin-absence.component.html',
  styleUrls: ['./admin-absence.component.css']
})
export class AdminAbsenceComponent implements OnInit{
  minDate!:string;
  maxDate!:string;
  daysOfWeek: String[] = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  s_group_id:string = "";
  s_session_id:string = "";
  s_date:string = "";
  s_day : number = -1;
  absence!:IAbsence;
  absences:IAbsence[] = []
  absencesf:IAbsence[] = []

  levels:any = [];
  years:any = [];
  groups:any = [];
  sessions:any = [];
  sessionsf:any = [];

  @ViewChild('absenceForm') absenceForm!: NgForm;
  showModal: boolean = false;
  constructor(private timetableService:TimetableService,private ms:MsService,private absenceService:AbsenceService, private changeDetection: ChangeDetectorRef){
    ms.getAcademicYears().subscribe((res:any)=>{
      let dates = ms.getLastAcademicYear(res);
      this.minDate = dates.min;
      this.maxDate = dates.max;
    })
  }
  ngOnInit(): void {
    this.ms.getLevels().subscribe((res)=>{
      this.levels = res;
      this.changeDetection.detectChanges();
    })
  }
  get() {
    this.absences = [];
    if(this.s_group_id != "" || this.s_session_id != "" || this.s_date != ""){
      this.absenceService.getAbsencesByGroupAndSessionAndDate(this.s_group_id,this.s_session_id,this.s_date).subscribe((data: any) => {
        this.absences = data;
        if(this.s_day!=-1){
          this.absencesf = this.absences.filter((item:any)=>{return item.day==this.s_day});
        }else{
          this.absencesf = this.absences;
        }
        this.changeDetection.detectChanges();
      })
    }
    else{
      this.absences = [];
      this.absencesf = [];
    }
  }
  setGroupId(event:any){
    this.s_group_id = event.target.value;
    this.s_session_id = "";
    this.get();
    this.timetableService.getTimetableByGroup(Number.parseInt(this.s_group_id)).subscribe((res:any)=>{
      this.sessions = res;
      if(this.s_day!=-1){
        this.sessionsf = this.sessions.filter((item:any)=>{return item.day==this.s_day});
      }else{
        this.sessionsf = this.sessions;
      }
    })
  }
  setSessionId(event:any){
    this.s_session_id = event.target.value;
    this.get()
  }
  setDate(event:any){
    if(this.s_day==-1 || new Date(event.target.value).getDay()==this.s_day){
      this.s_date = event.target.value;
      this.get()
    }else
      event.target.value = "";
  }
  setDay(event:any){
    this.s_day = event.target.value;
    if(this.s_day!=-1 && (this.s_date!="" || this.s_session_id!="")){
      this.s_date = "";
      this.s_session_id = "";
      this.get();
    }
    if(this.s_day!=-1){
      this.sessionsf = this.sessions.filter((item:any)=>{return item.day==this.s_day});
      this.absencesf = this.absences.filter((item:any)=>{return item.day==this.s_day});
    }else{
      this.sessionsf = this.sessions;
      this.absencesf = this.absences;
    }
    this.changeDetection.detectChanges();
  }
  getYearsByLevel(event:any){
    this.years = [];
    this.groups = [];
    if((this.s_group_id != "" || this.s_session_id != "") && this.s_date != ""){
      this.s_group_id = "";
      this.s_session_id = "";
        this.get();
    }else if(this.s_date == "")
      this.absences = [];
    if(event.target.value && event.target.value!="")
      this.ms.getYearsByLevel(event.target.value).subscribe((res)=>{
        this.years = res;
        this.groups = [];
        this.changeDetection.detectChanges();
      })
  }
  getGroupsByYear(event:any){
    this.s_group_id = "";
    if(event.target.value && event.target.value!="")
      this.ms.getGroupsByYear(event.target.value).subscribe((res)=>{
        this.groups = res;
        this.changeDetection.detectChanges();
      })
  }

  //==
  delete(id:string|undefined){
    this.absenceService.delete(id).subscribe((res)=>{
      this.get();
    })
  }
  showEditModal(absence:IAbsence){
    this.absence = absence;
    this.absenceForm.controls['status'].setValue(absence.status)
    this.showModal = true
  }
  
  hide() {
    this.showModal = false
    this.absenceForm.resetForm()
  }
  save(){
    this.absence.status = this.absenceForm.controls['status'].value;
    this.absenceService.edit(this.absence._id,this.absence).subscribe((res)=>{
      this.get();
      this.hide()
    })
  }
  getDay(date:Date){
    return this.daysOfWeek[new Date(date).getDay()]
  }
}
