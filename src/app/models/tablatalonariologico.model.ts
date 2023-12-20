import { v4 as uuidv4 } from 'uuid';
import { HandsonTable } from './handsontable.model';
import { HotTableRegisterer } from '@handsontable/angular';
import { sumatalonario } from './sumatalonario';



import Handsontable from "handsontable";
import { ContextMenu } from "handsontable/plugins";
import HyperFormula from 'hyperformula';


export class TalonarioLogico {

 
  
    idventatalonario?: string = uuidv4();
    idcentralizadormes?: string = '';
    idpuntoventaactividad?: string = '';
    numtalonario?: number = 0;
    factinicial: number = 0;
    factfinal?: number = 0;
    agregarFilas?: boolean = false;
    tipo?: number= 0;
    montodinamico?: string = '';
    sumatalonarios?: any = [] ;
    
   
   







 




}


