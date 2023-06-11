import { Component } from '@angular/core';
import { Group } from '../group';
import { SgroupService } from '../services/sgroup.service';
import { HttpClient } from '@angular/common/http';
import { Year } from '../../year/year';
import { SyearService } from '../../year/services/syear.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grouptable',
  templateUrl: './grouptable.component.html',
  styleUrls: ['./grouptable.component.css']
})
export class GrouptableComponent {

  constructor(private groupService:SgroupService,
    private http:HttpClient,
    private yearService:SyearService,
    private router:Router
    ) { }
  GroupsData: Group[] = [];

  anneeScolaireId:number = 0;
  DataYear: Year[] = [];

  ngOnInit(): void {
    this.groupService.getallgroups().subscribe(
          Data => {
            this.GroupsData = Data;
        }
    );

    this.yearService.getallyears().subscribe(
      Data => {
        this.DataYear = Data;
    }
  );
  }

  deletegroup(id: number):void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')){
      this.groupService.deletegroup(id).subscribe(
        () => {
            this.GroupsData = this.GroupsData.filter(y => y.groupeId !== id);
        }
      );
    }
  }

  getgroupeIDS(groupeId:number, anneeNom:String):void {
    const yearselected = this.DataYear.find(year => year.anneeNom === anneeNom);
    this.router.navigate(['/admin/group/', groupeId, yearselected?.anneeId, 'modify']);
  }


}
