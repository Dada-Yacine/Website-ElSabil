import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponentDash } from './teacher.component';
import { TTopNavComponent } from './top-nav/top-nav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TeacherComponentDash,
    TTopNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TeacherModule { }
