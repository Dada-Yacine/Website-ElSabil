import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TimetableService } from '../services/timetable.service';
import { ClassroomService } from '../services/classroom.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Session } from '../models/session.model';
import { MsService } from '../services/ms.service';

@Component({
  selector: 'app-admin-timetable',
  templateUrl: './admin-timetable.component.html',
  styleUrls: ['./admin-timetable.component.css']
})
export class AdminTimetableComponent implements OnInit {
  daysOfWeek: String[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  data: any[] = [];
  times: any[] = [];
  days: number[] = [];
  classrooms:any = [];
  s_group_id:string = "";
  s_teacher_id:string = "";
  s_classroom_id:string = "";
  sessionID!:string;

  @ViewChild('sessionForm') sessionForm!: NgForm;
  showModal: boolean = false;
  ModalAdd:boolean = true;

  levels:any = [];
  years:any = [];
  groups:any = [];
  courses:any = [];
  teachers:any = [];
  constructor(private route: ActivatedRoute, private router: Router, private changeDetection: ChangeDetectorRef, private timetableService: TimetableService, private classroomService: ClassroomService,private ms:MsService) { }

  ngOnInit() {
    this.getLevels();
    this.classroomService.getAll().subscribe((res)=>{
      this.classrooms = res;
      this.changeDetection.detectChanges();
    })
  }

  edit(){
    let session = this.getFormData();
    this.timetableService.editSession(this.sessionID,session).subscribe((err)=>{
      this.hide()
      this.sessionForm.reset()
      this.get()
    })
  }
  delete(id:string){
    this.timetableService.deleteSession(id).subscribe(()=>{
      this.get()
    })
  }
  save() {
    let session = this.getFormData();
    this.timetableService.addSession(session).subscribe((err) => {
      this.hide()
      this.get()
    })
  }
  get() {
    this.data = [];
    this.times = [];
    this.days = [];
    if(this.s_group_id != "" || this.s_teacher_id != "" || this.s_classroom_id != "")
      this.timetableService.getTimetableByGroupAndTeacherAndClassroom(this.s_group_id,this.s_teacher_id,this.s_classroom_id).subscribe((data: any) => {
        let All = this.timetableService.getDataForTable(data);
        this.data = All.sessions;
        this.days = All.days;
        this.times = All.times;
        this.changeDetection.detectChanges();
      })
  }

  setGroupId(event:any){
    this.s_group_id = event.target.value;
    this.get()
  }
  setTeacherId(event:any){
    this.s_teacher_id = event.target.value;
    this.get()
  }
  setClassroomId(event:any){
    this.s_classroom_id = event.target.value;
    this.get()
  }
  getLevels(){
    this.levels = [];
    this.teachers = [];
    this.years = [];
    this.groups = [];
    this.courses = [];
    this.ms.getLevels().subscribe((res)=>{
      this.levels = res;
      this.changeDetection.detectChanges();
    })
  }
  getYearsByLevel(event:any){
    this.years = [];
    this.groups = [];
    if((this.s_group_id != "" || this.s_teacher_id != "") && this.s_classroom_id != ""){
      this.s_group_id = "";
      this.s_teacher_id = "";
        this.get();
    }else if(this.s_classroom_id == "")
      this.data = [];
    this.courses = [];
    if(event.target.value && event.target.value!="")
      this.ms.getYearsByLevel(event.target.value).subscribe((res)=>{
        this.years = res;
        this.groups = [];
        this.changeDetection.detectChanges();
      })
  }
  getGroupsByYear(event:any){
    this.s_group_id = "";
    this.courses = [];
    if(event.target.value && event.target.value!="")
      this.ms.getGroupsByYear(event.target.value).subscribe((res)=>{
        this.groups = res;
        this.changeDetection.detectChanges();
      })
  }
  getCoursesByGroupe(event:any){
    this.courses = [];
    if(event.target.value && event.target.value!="")
      this.ms.getCoursesByGroupe(event.target.value).subscribe((res)=>{
        this.courses = res;
        this.changeDetection.detectChanges();
      })
  }
  getTeachersByLevel(event:any){
    this.teachers = [];
    if(event.target.value && event.target.value!="")
      this.ms.getTeachersByLevel(event.target.value).subscribe((res)=>{
        this.teachers = res;
        this.changeDetection.detectChanges();
      })
  }

  getClassroomName(id:string):string{
    let classroom = this.classrooms.find((item:any)=>{return item._id == id})
    if(classroom)
      return classroom.name
    else 
      return ""
  }

  show() {
    this.showModal = true
    this.ModalAdd = true
  }
  hide() {
    this.showModal = false
    this.sessionForm.reset()
  }
  showEditModal(id:string,day:number){
    this.sessionID = id
    this.ModalAdd = false
    this.showModal = true
    let i = this.data[day].findIndex((item:any) => { return item._id==id })
    
    this.sessionForm.controls['course_id'].setValue(this.data[day][i].course_id);
    this.sessionForm.controls['teacher_id'].setValue(this.data[day][i].teacher_id);
    this.sessionForm.controls['classroom_id'].setValue(this.data[day][i].classroom_id);
    this.sessionForm.controls['day'].setValue(this.data[day][i].day);
    this.sessionForm.controls['type'].setValue(this.data[day][i].type);
    this.sessionForm.controls['timeStartH'].setValue(this.data[day][i].start_time.split(':')[0])
    this.sessionForm.controls['timeStartM'].setValue(this.data[day][i].start_time.split(':')[1]);
    this.sessionForm.controls['timeEndH'].setValue(this.data[day][i].end_time.split(':')[0])
    this.sessionForm.controls['timeEndM'].setValue(this.data[day][i].end_time.split(':')[1]);
  }
  getFormData():Session{
    let session = new Session();
    session.group_id = this.s_group_id;
    session.group_name = this.groups.find((item:any)=>{return item.id == this.s_group_id}).name;
    session.course_id = this.sessionForm.controls['course_id'].value;
    session.course_name = this.courses.find((item:any)=>{return item.id == session.course_id}).name;
    session.teacher_id = this.sessionForm.controls['teacher_id'].value;
    session.teacher_full_name = this.teachers.find((item:any)=>{return item.id == session.teacher_id}).name;
    session.classroom_id = this.sessionForm.controls['classroom_id'].value;
    session.day = this.sessionForm.controls['day'].value;
    session.type = this.sessionForm.controls['type'].value;
    session.start_time = this.sessionForm.controls['timeStartH'].value + ':' + this.sessionForm.controls['timeStartM'].value;
    session.end_time = this.sessionForm.controls['timeEndH'].value + ':' + this.sessionForm.controls['timeEndM'].value;
    return session;
  }
}
