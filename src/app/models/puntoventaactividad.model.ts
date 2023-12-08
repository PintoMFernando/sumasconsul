import { actividadess } from "./actividades.model";
import { Puntoventa } from "./puntoventa.model";
import { ventataalonario } from "./ventatalonario";

export class puntoventaactividad{
    
    idpuntoventaactividad?: string;
    idactividades?: number;
    idpuntoventa?: number;
    estado?:true;
    actividadess?: actividadess;
    created_at?: Date;
    updated_at?:Date;
    ventatalonarios?: ventataalonario;
    
}