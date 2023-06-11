import { cours } from "./cours.model";

export class Etudiants {
    id!: number;
    nom!: string;
    prenom!: string;
    dateNaissance!: Date;
    wilaya!:String ;
    ville!:String ;
    rue!:String ;
    adresse?: Adresse;
    numeroTelephone!: string;
    email!: string;
    motDePasse!: string;
    role!:string;
    active!:string;
    niveau:string | undefined;
    annee:string | undefined;
    groupe:string | undefined;
    idgroupe!:number| undefined; 
    idannee!:number | undefined; 
    idniveau!:number| undefined;
    
  }
  export interface Adresse {
    wilaya: string  |undefined;
    ville: string | undefined;
    rue: string | undefined;
  }
  
   
 
  