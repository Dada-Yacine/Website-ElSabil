import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ISession } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private http:HttpClient) { }

  getTimetableByGroup(id:number){
    return this.http.get('http://localhost:3000/timetable/bygroup/'+id,{responseType:'json'});

  }
  getTimetableByTeacher(id:number){
    return this.http.get('http://localhost:3000/timetable/byteacher/'+id,{responseType:'json'});

  }
  getTimetableByGroupAndTeacherAndClassroom(group_id:string,teacher_id:string,classroom_id:string){
    let url = 'http://localhost:3000/timetable/filter?';
    if(group_id!=undefined && group_id!="") 
      url +='group_id='+group_id

    if(url.at(url.length-1)!="?") 
      url +='&';
    if(teacher_id!=undefined && teacher_id!="") 
      url +='teacher_id='+teacher_id ;

    if(url.at(url.length-1)!="?") 
      url +='&';
    if(classroom_id!=undefined && classroom_id!="") 
      url +='classroom_id='+classroom_id;
    return this.http.get(url,{responseType:'json'});
  }
  addSession(session:ISession){
    return this.http.post('http://localhost:3000/timetable/',session,{responseType:'json'});
  }
  editSession(id:string,session:ISession){
    return this.http.put('http://localhost:3000/timetable/'+id,session,{responseType:'json'});
  }
  deleteSession(id:string){
    return this.http.delete('http://localhost:3000/timetable/'+id,{responseType:'json'});
  }

  getDataForTable(data:any){
    let sessions: any[] = [];
    let times: any[] = [];
    let days: number[] = [];
    data.sort(this.compare2);
      for (let i in data) {
        let o = { "start_time": data[i].start_time, "end_time": data[i].end_time };
        let n = times.filter(item => {return item.start_time == o.start_time && item.end_time == o.end_time}).length;
        if ( n==0 && times.length> 0) {
            let lastItem = times[times.length - 1];
            if (o.start_time < lastItem.end_time) {
              times.splice(times.length - 1, 1);
              if (o.start_time > lastItem.start_time)
                times.push({ "start_time": lastItem.start_time, "end_time": o.start_time });
              if (o.end_time > lastItem.end_time){
                times.push({ "start_time": o.start_time, "end_time": lastItem.end_time });
                times.push({ "start_time": lastItem.end_time, "end_time": o.end_time });
              }
              else{
                times.push({ "start_time": o.start_time, "end_time": o.end_time });
                if (o.end_time < lastItem.end_time)
                  times.push({ "start_time": o.end_time, "end_time": lastItem.end_time });
              }
            } else
              times.push(o);
        } else if (n == 0)
          times.push(o);
      
      if (!days.includes(data[i].day)) {
        days.push(data[i].day);
        sessions[data[i].day] = [];
      }
    }
    days.sort();
    data.sort(this.compare);
    let currentDate = new Date();
    for (let i in data) {
      if(
        data[i].day == currentDate.getDay() && 
        data[i].start_time <= currentDate.getHours()+":"+currentDate.getMinutes() && 
        data[i].end_time >= currentDate.getHours()+":"+currentDate.getMinutes()
        )
        data[i].isCurrentSession = true;
      let j = times.findIndex(item => { return item.start_time == data[i].start_time });
      data[i].colspan = 1;
      if(j!=-1)
        while (j<times.length && data[i].end_time != times[j].end_time) {
          data[i].colspan += 1;
          j += 1;
        }
      sessions[data[i].day].push(data[i]);
    }
    let j = times.length;
    for (let a in sessions) {
      let daySessions = sessions[a];
      let j2 = daySessions.length;
      let k = 0;
      let i = 0;
      while (i < j && k < j2) {
        if (times[i].start_time == daySessions[k].start_time) {
          i += daySessions[k].colspan;
          k++;
        } else {
          let v = { "colspan": 0, "start_time": times[i].start_time, "end_time": times[i].end_time };
          while (times[i].start_time != daySessions[k].start_time && i < j) {
            v.colspan += 1;
            v.end_time = times[i].end_time;
            i++;
          }
          daySessions.push(v);
        }
        if (daySessions.length == k)
          break;
      }
      daySessions.sort(this.compare2);
      if (daySessions[daySessions.length - 1].end_time != times[times.length - 1].end_time) {
        let j = times.findIndex(item => { return item.end_time == daySessions[daySessions.length - 1].end_time })
        daySessions.push({ "colspan": times.length - j - 1 });
      }
    }
    return {"sessions":sessions,"days":days,"times":times}
  }
  compare(a: any, b: any): Number {
    if (a.day > b.day || (a.day == b.day && a.start_time > b.start_time) || (a.day == b.day && a.start_time == b.start_time && a.end_time > b.end_time))
      return 1;
    else if (a.day < b.day || (a.day == b.day && a.start_time < b.start_time) || (a.day == b.day && a.start_time == b.start_time && a.end_time < b.end_time))
      return -1;
    else
      return 0;
  }
  compare2(a: any, b: any): Number {
    if (a.start_time > b.start_time || (a.day == b.day && a.start_time == b.start_time && a.end_time > b.end_time))
      return 1;
    else if (a.start_time < b.start_time || (a.day == b.day && a.start_time == b.start_time && a.end_time < b.end_time))
      return -1;
    else
      return 0;
  }
}
