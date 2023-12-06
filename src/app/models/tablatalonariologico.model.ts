import { HotTableRegisterer } from "@handsontable/angular";
import Handsontable from "handsontable";
import { ContextMenu } from "handsontable/plugins";
import HyperFormula from 'hyperformula';
import { v4 as uuidv4 } from 'uuid';

export class TalonarioLogico {
   

    id: string = uuidv4();
    nombreactividad: string = '';
    numtalonario: number = 0;
    factinicial: number = 0;
    factfinal: number = 0;
    agregarFilas: boolean = false;
    montodinamico: string = '';
    facturas: any = [];

}
