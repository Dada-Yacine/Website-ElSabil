import { Injectable } from '@angular/core';
import { Teacher } from './teacher';

@Injectable({
  providedIn: 'root'
})
export class SteacherService {

  TeacherData:Teacher[] = [{
    id:1,
    nom:'Djamel Bensaber',
  },
  {
    id:2,
    nom:'Abdelkader Amrane'
  },
  {
    id:3,
    nom:'Amina Taouli'
  }
]

  getallteachers(): Teacher[] {
    return this.TeacherData;
  }
}
