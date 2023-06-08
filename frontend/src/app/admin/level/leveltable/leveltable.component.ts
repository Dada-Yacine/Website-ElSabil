import { Component } from '@angular/core';
import { Level } from '../level';
import { SLevelService } from '../services/slevel.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leveltable',
  templateUrl: './leveltable.component.html',
  styleUrls: ['./leveltable.component.css']
})
export class LeveltableComponent {

  constructor(private LevelService:SLevelService, private http:HttpClient) { }
  LevelsData: Level[] = [];

  ngOnInit(): void {
    this.LevelService.getalllevels().subscribe(
          Data => {
            this.LevelsData = Data;
        }
    );
  }

  deletelevel(id: number):void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce niveau ?')){
      this.LevelService.deletelevel(id).subscribe(
        () => {
            this.LevelsData = this.LevelsData.filter(l => l.niveauId !== id);
        }
      );
    }
  }

}
