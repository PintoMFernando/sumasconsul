import { v4 as uuidv4 } from 'uuid';

export class TalonarioLogico {
   

    idventatalonario: string = uuidv4();
    idcentralizadormes: string = '';
    idpuntoventaactividad: string = '';
    numtalonario: number = 0;
    factinicial: number = 0;
    factfinal: number = 0;
    agregarFilas: boolean = false;
    montodinamico: string = '';
    facturas: any = [];

}
