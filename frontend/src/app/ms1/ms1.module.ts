import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { EtudiantModifierComponent } from './etudiant-modifier/etudiant-modifier.component';

import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeachermodifierComponent } from './teachermodifier/teachermodifier.component';

import { TasksComponent } from './tasks/tasks.component';
import { ReponseTaskComponent } from './reponse-task/reponse-task.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    TeacherListComponent,
    TeacherComponent,
    TeachermodifierComponent,
    EtudiantListComponent,
    EtudiantComponent,
    EtudiantModifierComponent,
    TasksComponent,
    ReponseTaskComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  exports: [
    TeacherListComponent,
    TeacherComponent,
    TeachermodifierComponent,
    EtudiantListComponent,
    EtudiantComponent,
    EtudiantModifierComponent,
    TasksComponent,
    ReponseTaskComponent,
  ]
})
export class ms1 { }
