import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { CloginComponent } from './clogin/clogin.component';
import { ResetComponent } from './reset/reset.component';
import { ProfileComponent } from './profile/profile.component';

import { AdminComponent } from './admin/admin.component';
import { EtudiantListComponent } from './ms1/etudiant-list/etudiant-list.component';
import { EtudiantComponent } from './ms1/etudiant/etudiant.component';
import { EtudiantModifierComponent } from './ms1/etudiant-modifier/etudiant-modifier.component';

import { TeacherListComponent } from './ms1/teacher-list/teacher-list.component';
import { TeacherComponent } from './ms1/teacher/teacher.component';
import { TeachermodifierComponent } from './ms1/teachermodifier/teachermodifier.component';

import { LeveltableComponent } from './admin/level/leveltable/leveltable.component';
import { LevelcreateComponent } from './admin/level/levelcreate/levelcreate.component';
import { LevelmodifyComponent } from './admin/level/levelmodify/levelmodify.component';
import { AyeartableComponent } from './admin/ayear/ayeartable/ayeartable.component';
import { AyearcreateComponent } from './admin/ayear/ayearcreate/ayearcreate.component';
import { AyearmodifyComponent } from './admin/ayear/ayearmodify/ayearmodify.component';
import { YeartableComponent } from './admin/year/yeartable/yeartable.component';
import { YearcreateComponent } from './admin/year/yearcreate/yearcreate.component';
import { YearmodifyComponent } from './admin/year/yearmodify/yearmodify.component';
import { AdminTimetableComponent } from './ms3/admin-timetable/admin-timetable.component';
import { AdminEventsComponent } from './ms3/admin-events/admin-events.component';
import { AdminClassroomsComponent } from './ms3/admin-classrooms/admin-classrooms.component';
import { CoursetableComponent } from './admin/course/coursetable/coursetable.component';
import { CoursecreateComponent } from './admin/course/coursecreate/coursecreate.component';
import { CoursemodifyComponent } from './admin/course/coursemodify/coursemodify.component';
import { GrouptableComponent } from './admin/group/grouptable/grouptable.component';
import { GroupcreateComponent } from './admin/group/groupcreate/groupcreate.component';
import { GroupmodifyComponent } from './admin/group/groupmodify/groupmodify.component';

import { PageChangeMotPasseComponent } from './page-change-mot-passe/page-change-mot-passe.component';
import { TasksComponent } from './ms1/tasks/tasks.component';
import { ReponseTaskComponent } from './ms1/reponse-task/reponse-task.component';

import { TeacherComponentDash } from './teacher/teacher.component';

import { StudentComponentDash } from './student/student.component';
import { AdminAbsenceComponent } from './ms3/admin-absence/admin-absence.component';
import { StudentAbsenceComponent } from './ms3/student-absence/student-absence.component';
import { StudentEventsComponent } from './ms3/student-events/student-events.component';
import { StudentTimetableComponent } from './ms3/student-timetable/student-timetable.component';
import { TeacherAbsenceComponent } from './ms3/teacher-absence/teacher-absence.component';
import { TeacherTimetableComponent } from './ms3/teacher-timetable/teacher-timetable.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component:CloginComponent},
  {path: 'reset', component:ResetComponent},
  {path: 'changermotpasse', component:PageChangeMotPasseComponent},
  {path: 'profil', component:ProfileComponent},
  {path: 'admin',
  component: AdminComponent,
  children: [
    {path: 'teacher', component:TeacherComponent},
    {path: 'teacherlist', component:TeacherListComponent},
    {path: 'teacherMod/:id', component:TeachermodifierComponent},
    {path: 'etuList', component: EtudiantListComponent },
    {path: 'etuMod/:id', component: EtudiantModifierComponent },
    {path: 'ajouterEtu', component:EtudiantComponent},


    {path: 'niveau', component: LeveltableComponent},
    {path: 'niveau/create', component: LevelcreateComponent},
    {path: 'niveau/:niveauId/modify', component: LevelmodifyComponent},
    {path: 'anneescholaire', component: AyeartableComponent},
    {path: 'anneescholaire/create', component: AyearcreateComponent},
    {path: 'anneescholaire/:id/modify', component: AyearmodifyComponent},
    {path: 'annee', component: YeartableComponent},
    {path: 'annee/create', component: YearcreateComponent},
    {path: 'annee/:anneeId/:anneeScolaireId/:niveauId/modify', component: YearmodifyComponent},
    {path: 'planning', component:AdminTimetableComponent},
    {path: 'events', component:AdminEventsComponent},
    {path: 'classrooms', component:AdminClassroomsComponent},
    {path: 'course', component: CoursetableComponent},
    {path: 'course/create', component: CoursecreateComponent},
<<<<<<< Updated upstream
    {path: 'course/:coursId/modify', component: CoursemodifyComponent},
    {path: 'absences', component:AdminAbsenceComponent},
=======
    {path: 'course/:coursId/:annneeID/modify', component: CoursemodifyComponent},
    {path: 'group', component: GrouptableComponent},
    {path: 'group/create', component: GroupcreateComponent},
    {path: 'group/:groupeId/:annneeID/modify', component: GroupmodifyComponent},
>>>>>>> Stashed changes
  ]
  },
  {path: 'student',
  component: StudentComponentDash,
  children: [
    {path: 'tasketudiant', component:ReponseTaskComponent},

    /*ms3*/
    {path: 'absences', component:StudentAbsenceComponent},
    {path: 'events', component:StudentEventsComponent},
    {path: 'planning', component:StudentTimetableComponent},

  ]
  },
  {path: 'teacher',
  component: TeacherComponentDash,
  children: [
    {path: 'tasks', component: TasksComponent },

    /*ms3*/
    {path: 'absences', component:TeacherAbsenceComponent},
    {path: 'planning', component:TeacherTimetableComponent},
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
