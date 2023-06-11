import { Injectable } from '@angular/core';
import { Teacher } from './teacher';

@Injectable({
  providedIn: 'root'
})
export class SteacherService {

  TeacherData:Teacher[] = [{
    id:0,
    nom:'Yacine',
  },
  {
    id:1,
    nom:'Hani'
  },
  {
    id:2,
    nom:'Lokmane'
  }
]

  getallteachers(): Teacher[] {
    return this.TeacherData;
  }
}
