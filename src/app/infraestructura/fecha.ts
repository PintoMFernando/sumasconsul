import * as moment from 'moment';
import { DatoSelect } from './Datos';
export class Fecha {
    private fecha:any;
    private static  meses: DatoSelect[] = [
        { label: 'Enero', value: 1 },
        { label: 'Febrero', value: 2 },
        { label: 'Marzo', value: 3 },
        { label: 'Abril', value: 4 },
        { label: 'Mayo', value: 5 },
        { label: 'Junio', value: 6 },
        { label: 'Julio', value: 7 },
        { label: 'Agosto', value: 8 },
        { label: 'Septiembre', value: 9 },
        { label: 'Octubre', value: 10 },
        { label: 'Noviembre', value: 11 },
        { label: 'Diciembre', value: 12 },
        
      ];
    public static  getMesesArray(){
        return this.meses;
    }
    public constructor(fechaInicial:string=''){
        if(fechaInicial === '')
            this.fecha = this.now();
        else 
            this.fecha = moment(fechaInicial);
    }
    public now(){
        return moment.now();
    }
    public addDay(day:number){
        return moment(this.fecha).add(day)
    }
    public static getNumeroMes(nombreMes: string): number | undefined {
        const mesEncontrado = this.meses.find((mes) => mes.label === nombreMes);
        return mesEncontrado ? mesEncontrado.value : undefined;
    }
}
