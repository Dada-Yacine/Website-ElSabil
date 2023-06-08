import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { STopNavComponent } from './top-nav/top-nav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StudentComponent,
    STopNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class StudentModule { }
