import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTimetableComponent } from './admin-timetable/admin-timetable.component';
import { StudentTimetableComponent } from './student-timetable/student-timetable.component';
import { FormsModule } from '@angular/forms';
import { TeacherTimetableComponent } from './teacher-timetable/teacher-timetable.component';
import { StudentAbsenceComponent } from './student-absence/student-absence.component';
import { TeacherAbsenceComponent } from './teacher-absence/teacher-absence.component';
import { AdminClassroomsComponent } from './admin-classrooms/admin-classrooms.component';
import { StudentEventsComponent } from './student-events/student-events.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminAbsenceComponent } from './admin-absence/admin-absence.component';




@NgModule({
  declarations: [
    AdminTimetableComponent,
    StudentTimetableComponent,
    TeacherTimetableComponent,
    StudentAbsenceComponent,
    TeacherAbsenceComponent,
    AdminClassroomsComponent,
    StudentEventsComponent,
    AdminEventsComponent,
    AdminAbsenceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AdminTimetableComponent,
    StudentTimetableComponent
  ]
})
export class ms3 { }
