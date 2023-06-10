import { Etudiant } from "./Etudiant.model";
import { Task } from "./task.model";

export interface SolutionTask {
idSolution: number;
etudiant: Etudiant;
devoir: Task;
filePathSolution: string;
}