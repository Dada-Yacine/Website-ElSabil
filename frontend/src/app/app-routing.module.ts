import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeacherComponent } from './teacher/teacher.component';
import { LeveltableComponent } from './admin/level/leveltable/leveltable.component';
import { LevelcreateComponent } from './admin/level/levelcreate/levelcreate.component';
import { LevelmodifyComponent } from './admin/level/levelmodify/levelmodify.component';
import { AyeartableComponent } from './admin/ayear/ayeartable/ayeartable.component';
import { AyearcreateComponent } from './admin/ayear/ayearcreate/ayearcreate.component';
import { AyearmodifyComponent } from './admin/ayear/ayearmodify/ayearmodify.component';
import { YeartableComponent } from './admin/year/yeartable/yeartable.component';
import { YearcreateComponent } from './admin/year/yearcreate/yearcreate.component';
import { YearmodifyComponent } from './admin/year/yearmodify/yearmodify.component';


import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { AdminTimetableComponent } from './ms3/admin-timetable/admin-timetable.component';
import { AdminEventsComponent } from './ms3/admin-events/admin-events.component';
import { AdminClassroomsComponent } from './ms3/admin-classrooms/admin-classrooms.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin',
  component: AdminComponent,
  children: [
    {path: 'niveau', component: LeveltableComponent},
    {path: 'niveau/create', component: LevelcreateComponent},
    {path: 'niveau/:niveauId/modify', component: LevelmodifyComponent},
    {path: 'anneescholaire', component: AyeartableComponent},
    {path: 'anneescholaire/create', component: AyearcreateComponent},
    {path: 'anneescholaire/:id/modify', component: AyearmodifyComponent},
    {path: 'annee', component: YeartableComponent},
    {path: 'annee/create', component: YearcreateComponent},
    {path: 'annee/:anneeId/modify', component: YearmodifyComponent},
    {path: 'planning',component:AdminTimetableComponent},
    {path: 'events',component:AdminEventsComponent},
    {path: 'classrooms',component:AdminClassroomsComponent}
  ]
  },
  {path: 'student',
  component: StudentComponent,
  children: [
  ]
  },
  {path: 'teacher',
  component: TeacherComponent,
  children: [
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
