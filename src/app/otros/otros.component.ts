import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import HyperFormula from 'hyperformula';

@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.css']
})
export class OtrosComponent {

  
  //PRUEBA Handsontable, DA
  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });
   
  hotSettings: Handsontable.GridSettings = {
    formulas: {
      engine: this.hyperformulaInstance,       //con esto funciona las formulas
    },
    data: [
      ['100', '', '=SUM(A:A)'],               
      ['', '',''],
      ['', '',''],
      ['', '',''],
      ['', '',''],
    ],   
    colHeaders: ['Monto Bs', 'Observaciones','TOTAL'], //aqui se coloca lo nombres de columnas
    rowHeaders: true, //Aqui se coloca la numeracion de filas
    minSpareRows: 1,  //esto crea automaticamente las filas
    fillHandle: true, //esto crea celdas al jalar desde una esquinita
                        //language: 'es-MX',
    colWidths: [50, 300, 50],               
    contextMenu: {
      items: {
        'row_above': {
          name: 'Insert row above this one (custom name)'
        },
        'row_below': {},
        'separator': ContextMenu.SEPARATOR,
        'clear_custom': {
          name: 'Clear all cells (custom)',
          callback: function() {
            this.clear();
          }
        }
      }    
    },
    columns: [
      {
        data: 'Monto Bs',
          //esto bloquea la celda para que solo sea de lectura
      },
      {
        data: 'Descuento',
        
      },
      {
        data: 'TOTAL',
        
      },
    ], 
    licenseKey: 'non-commercial-and-evaluation'
  };


}
