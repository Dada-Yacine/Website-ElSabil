import { Task } from "./task.model";

export interface Etudiant {
    id: number;
    // Define other properties of the Etudiant entity
    devoirs: Task[];
  }
  