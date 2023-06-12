import { Component } from '@angular/core';
import { Course } from '../../admin/course/course';

@Component({
  selector: 'app-scoursetable',
  templateUrl: './scoursetable.component.html',
  styleUrls: ['./scoursetable.component.css']
})
export class ScoursetableComponent {

  constructor(
    ) { }

    coursesData: Course[] = [{
      coursId: 1,
      coursNom: 'Arabe',
      coursCoef: 2,
      enseignantId: 1,
      enseigantNom: 'Djamel Bensaber',
      anneeNom: 'Premiere Primaire',
      annneeID:1,
    },
    {
      coursId: 2,
      coursNom: 'Histoire Geo',
      coursCoef: 3,
      enseignantId: 1,
      enseigantNom: 'Djamel Bensaber',
      anneeNom: 'Premiere Primaire',
      annneeID:1,
    },
    {
      coursId: 3,
      coursNom: 'Francais',
      coursCoef: 3,
      enseignantId: 2,
      enseigantNom: 'Abdelkader Amrane',
      anneeNom: 'Deuxieme CEM',
      annneeID:2,
    },
    {
      coursId: 4,
      coursNom: 'Anglais',
      coursCoef: 4,
      enseignantId: 3,
      enseigantNom: 'Amina Taouli',
      anneeNom: 'Deuxieme CEM',
      annneeID:2,
    },
    {
      coursId: 5,
      coursNom: 'Science Islamique',
      coursCoef: 5,
      enseignantId: 1,
      enseigantNom: 'Djamel Bensaber',
      anneeNom: 'Premiere Primaire',
      annneeID:1,
    }];


}
