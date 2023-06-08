import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AbsenceService } from '../services/absence.service';
import { IAbsence } from '../models/absence.model';

@Component({
  selector: 'app-teacher-absence',
  templateUrl: './teacher-absence.component.html',
  styleUrls: ['./teacher-absence.component.css']
})
export class TeacherAbsenceComponent implements OnInit{
  daysOfWeek: String[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  id:string = "10";
  absence!:IAbsence;
  absences:IAbsence[] = []

  @ViewChild('absenceForm') absenceForm!: NgForm;
  showModal: boolean = false;

  constructor(private absenceService:AbsenceService, private changeDetection: ChangeDetectorRef){}
  ngOnInit() {
    this.get(this.id);
  }
  get(id:string){
    this.absenceService.getAbsencesByTeacher(id).subscribe((res:any)=>{
      this.absences = res;
      this.changeDetection.detectChanges()
    })
  }
  delete(id:string|undefined){
    this.absenceService.delete(id).subscribe((res)=>{
      this.get(this.id);
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
      this.get(this.id);
      this.hide()
    })
  }
  getDay(date:Date){
    return this.daysOfWeek[new Date(date).getDay()]
  }
}
