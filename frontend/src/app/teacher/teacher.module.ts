import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponentDash } from './teacher.component';
import { TTopNavComponent } from './top-nav/top-nav.component';
import { RouterModule } from '@angular/router';
import { TcoursetableComponent } from './tcoursetable/tcoursetable.component';



@NgModule({
  declarations: [
    TeacherComponentDash,
    TTopNavComponent,
    TcoursetableComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TeacherModule { }
