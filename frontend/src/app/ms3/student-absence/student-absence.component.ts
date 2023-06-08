import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IAbsence } from '../models/absence.model';
import { AbsenceService } from '../services/absence.service';

@Component({
  selector: 'app-student-absence',
  templateUrl: './student-absence.component.html',
  styleUrls: ['./student-absence.component.css']
})
export class StudentAbsenceComponent implements OnInit{
  id:string = "1";
  absences:IAbsence[] = []

  constructor(private absenceService:AbsenceService, private changeDetection: ChangeDetectorRef){}
  ngOnInit() {
    this.get(this.id);
  }
  get(id:string){
    this.absenceService.getAbsencesByStudent(id).subscribe((res:any)=>{
      this.absences = res;
      this.changeDetection.detectChanges()
    })
  }
}
