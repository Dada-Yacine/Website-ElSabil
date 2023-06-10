import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponentDash } from './student.component';
import { STopNavComponent } from './top-nav/top-nav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StudentComponentDash,
    STopNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class StudentModule { }
