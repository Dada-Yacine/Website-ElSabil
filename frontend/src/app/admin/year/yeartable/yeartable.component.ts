import { Component } from '@angular/core';
import { Year } from '../year';
import { SyearService } from '../services/syear.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-yeartable',
  templateUrl: './yeartable.component.html',
  styleUrls: ['./yeartable.component.css']
})
export class YeartableComponent {

  constructor(private yearService:SyearService, private http:HttpClient) { }
  YearsData: Year[] = [];

  ngOnInit(): void {
    this.yearService.getallyears().subscribe(
          Data => {
            this.YearsData = Data;
        }
    );
  }

  deleteyear(id: number):void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce niveau ?')){
      this.yearService.deleteyear(id).subscribe(
        () => {
            this.YearsData = this.YearsData.filter(y => y.anneeId !== id);
        }
      );
    }
  }

}
