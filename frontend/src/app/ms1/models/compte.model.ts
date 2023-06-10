import { User } from "./user.model";

export interface Compte {
    idCompte:number;
    email:String;
    password:String;
    user:User;
  }
