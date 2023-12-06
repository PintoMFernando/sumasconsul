import { sumatalonario } from "./sumatalonario";

export class ventataalonario{ 

  idventatalonario?:string; 
  numtalonario?:number;
  factinicial?:number;
  factfinal?:number;
  tipo?:number;
  montototal?:number;
  idpuntoventaactividad?:string;
  idcentralizadormes?:string;
  created_at?:Date;
  updated_at?:Date;
  deletedAtobs?: Date | null;
 sumatalonario?:sumatalonario[];
   
}
