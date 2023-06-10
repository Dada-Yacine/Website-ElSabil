

export interface User {

    id: number ;
    nom: string;
    prenom: string;
    email: string;
    numeroTelephone: string;
    adresse :Addresse ;
    role: string;
    datenaissance:Date ;

  }
  export interface Addresse {
    wilaya:String ;
     ville:String ;
     rue:String ;
  }
  export interface Compte {
    id:number;
    username:String;
    password:String;
    user:User;
  }

