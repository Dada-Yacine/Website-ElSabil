import { Component } from '@angular/core';
import { Ayear } from '../ayear';
import { SayearService } from '../services/sayear.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-ayeartable',
  templateUrl: './ayeartable.component.html',
  styleUrls: ['./ayeartable.component.css']
})
export class AyeartableComponent {


  constructor(private AyearService:SayearService, private http:HttpClient) { }
  AyearData: Ayear[] = [];

  ngOnInit(): void {
    this.AyearService.getallayears().subscribe(
          Data => {
            this.AyearData = Data;
        }
    );
  }

  deleteayear(id: number):void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette année scolaire ?')){
      this.AyearService.deleteayear(id).subscribe(
        () => {
            this.AyearData = this.AyearData.filter(ay => ay.id !== id);
        }
      );
    }
  }

}
