import { Task } from "./task.model";


export class Course {
    id!: number ;
    name!: string;
    coursCoef!:number;
    idEnseignant!:number;
    enseigantNom!:string;
    anneeNom!:string;
    tasks: Task[] | undefined;
    // Add other properties as needed
  }