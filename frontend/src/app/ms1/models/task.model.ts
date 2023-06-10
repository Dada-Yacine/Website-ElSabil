import { Course } from "./course.model";
import { Etudiant } from "./Etudiant.model";
import { SolutionTask } from "./SolutionTask.model";


export interface Task {
    id: number;
  name: string;
  date: string; // Adjust the type to match the format used in your Spring Boot entity (e.g., 'yyyy-MM-dd')
  course?: Course| null; // Assuming you have defined the 'Courses' type/interface
  
  etudiants: Etudiant[];
    file: File | null;
    solutionTasks:SolutionTask[];
   
}    