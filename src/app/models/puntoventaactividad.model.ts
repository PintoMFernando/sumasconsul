import { actividadess } from "./actividades.model";
import { Puntoventa } from "./puntoventa.model";

export class puntoventaactividad{
    
    idpuntoventaactividad?: string;
    idactividades?: number;
    idpuntoventa?: number;
    actividadess?: actividadess;
    puntoventa?: Puntoventa;
}