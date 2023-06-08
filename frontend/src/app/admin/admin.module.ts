import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ATopNavComponent } from './top-nav/top-nav.component';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { LeveltableComponent } from './level/leveltable/leveltable.component';
import { LevelcreateComponent } from './level/levelcreate/levelcreate.component';
import { LevelmodifyComponent } from './level/levelmodify/levelmodify.component';
import { YeartableComponent } from './year/yeartable/yeartable.component';
import { YearcreateComponent } from './year/yearcreate/yearcreate.component';
import { YearmodifyComponent } from './year/yearmodify/yearmodify.component';
import { AyearcreateComponent } from './ayear/ayearcreate/ayearcreate.component';
import { AyearmodifyComponent } from './ayear/ayearmodify/ayearmodify.component';
import { AyeartableComponent } from './ayear/ayeartable/ayeartable.component';
import { GrouptableComponent } from './group/grouptable/grouptable.component';
import { GroupcreateComponent } from './group/groupcreate/groupcreate.component';
import { GroupmodifyComponent } from './group/groupmodify/groupmodify.component';
import { CoursetableComponent } from './course/coursetable/coursetable.component';
import { CoursemodifyComponent } from './course/coursemodify/coursemodify.component';
import { CoursecreateComponent } from './course/coursecreate/coursecreate.component';



@NgModule({
  declarations: [
    ATopNavComponent,
    AdminComponent,
    LeveltableComponent,
    LevelcreateComponent,
    LevelmodifyComponent,
    YeartableComponent,
    YearcreateComponent,
    YearmodifyComponent,
    AyearcreateComponent,
    AyearmodifyComponent,
    AyeartableComponent,
    GrouptableComponent,
    GroupcreateComponent,
    GroupmodifyComponent,
    CoursetableComponent,
    CoursemodifyComponent,
    CoursecreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class AdminModule {}
