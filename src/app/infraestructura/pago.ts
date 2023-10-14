import * as moment from 'moment';
import { TipopagoSelect } from './Tipopago';
export class Pago {
    private pago:any;
    private static  tipos: TipopagoSelect[] = [
        { label: 'Efectivo', value: 1 },
        { label: 'Transferencia', value: 2 },
        { label: 'QR', value: 3 },
        
        
      ];
    public static  getTiposArray(){
        return this.tipos;
    }
    public constructor(fechaInicial:string=''){
        if(fechaInicial === '')
            this.pago = this.now();
        else 
            this.pago = moment(fechaInicial);
    }
    public now(){
        return moment.now();
    }
    public addDay(day:number){
        return moment(this.pago).add(day)
    }
}
