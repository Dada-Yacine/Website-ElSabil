import { Injectable } from '@angular/core';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class SstudentService {

  StudentData:Student[] = [];

  getallstudentsbydroupId(groupId:number): Student[] {
    return this.StudentData;
  }

}
