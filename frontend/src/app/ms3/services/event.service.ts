import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get('http://localhost:3000/event',{responseType:'json'});
  }
  add(event:IEvent,image:File){
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('title', event.title);
    formData.append('description', event.description);
    for (var i = 0; i < event.years.length; i++) {
      formData.append('years[]', event.years[i]);
    }
    formData.append('date', event.date.toString());
    formData.append('start_time', event.start_time);
    formData.append('end_time', event.end_time);
    return this.http.post('http://localhost:3000/event/',formData,{responseType:'json'});
  }
  edit(id:string|undefined, event:IEvent,image:File){
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('title', event.title);
    formData.append('description', event.description);
    for (var i = 0; i < event.years.length; i++) {
      formData.append('years', event.years[i]);
    }
    formData.append('date', event.date.toString());
    formData.append('start_time', event.start_time);
    formData.append('end_time', event.end_time);
    return this.http.put('http://localhost:3000/event/'+id,formData,{responseType:'json'});
  }
  delete(id:string|undefined){
    return this.http.delete('http://localhost:3000/event/'+id,{responseType:'json'});
  }
}
