import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClassroomService } from '../services/classroom.service';
import { Classroom, IClassroom } from '../models/classroom.model';

@Component({
  selector: 'app-admin-classrooms',
  templateUrl: './admin-classrooms.component.html',
  styleUrls: ['./admin-classrooms.component.css']
})
export class AdminClassroomsComponent implements OnInit{
  classroom!:IClassroom;
  classrooms:IClassroom[] = []
  ModalAdd:boolean = false

  @ViewChild('classroomForm') classroomForm!: NgForm;
  showModal: boolean = false;

  constructor(private classroomService:ClassroomService, private changeDetection: ChangeDetectorRef){}
  ngOnInit() {
    this.get();
  }
  get(){
    this.classroomService.getAll().subscribe((res:any)=>{
      this.classrooms = res;
      this.changeDetection.detectChanges()
    })
  }
  delete(id:string|undefined){
    this.classroomService.delete(id).subscribe((res)=>{
      this.get();
    })
  }
  showEditModal(classroom:IClassroom){
    this.classroom = classroom;
    this.classroomForm.controls['name'].setValue(classroom.name)
    this.ModalAdd = false
    this.showModal = true
  }
  show(){
    this.ModalAdd = true
    this.showModal = true
  }
  
  hide() {
    this.showModal = false
    this.classroomForm.resetForm()
  }
  add(){
    let classroom = new Classroom()
    classroom.name = this.classroomForm.controls['name'].value;
    this.classroomService.add(classroom).subscribe((res)=>{
      this.get();
      this.hide()
    })
  }
  save(){
    this.classroom.name = this.classroomForm.controls['name'].value;
    this.classroomService.edit(this.classroom._id,this.classroom).subscribe((res)=>{
      this.get();
      this.hide()
    })
  }
}
