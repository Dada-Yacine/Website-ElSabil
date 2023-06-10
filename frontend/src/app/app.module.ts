import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { HomeComponent } from './home/home.component';
import { CloginComponent } from './clogin/clogin.component';
import { ResetComponent } from './reset/reset.component';
import { ProfileComponent } from './profile/profile.component';
import { PageChangeMotPasseComponent } from './page-change-mot-passe/page-change-mot-passe.component';

import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ms3 } from './ms3/ms3.module';
import { ms1 } from './ms1/ms1.module';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CloginComponent,
    ResetComponent,
    ProfileComponent,
    PageChangeMotPasseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    StudentModule,
    TeacherModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ms3,
    ms1,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
