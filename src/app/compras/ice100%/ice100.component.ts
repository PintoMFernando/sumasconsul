import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import HyperFormula from 'hyperformula';

@Component({
  selector: 'app-ice100',
  templateUrl: './ice100.component.html',
  styleUrls: ['./ice100.component.css']
})
export class Ice100Component {

  
  //PRUEBA Handsontable, DA
  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });
   
  hotSettings: Handsontable.GridSettings = {
    formulas: {
      engine: this.hyperformulaInstance,       //con esto funciona las formulas
    },
    data: [
      ['10', '=SUM(A:A)','20','=SUM(C:C)','30','=SUM(E:E)'], 
      ['', '', ''],               
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
    ],   
    colHeaders: ['ICE 100%','TOTAL ICE 100%','ICE Credito Fiscal','TOTAL ICE Credito Fiscal','Descuento','TOTAL Descuento'], //aqui se coloca lo nombres de columnas
    rowHeaders: true, //Aqui se coloca la numeracion de filas
    minSpareRows: 1,  //esto crea automaticamente las filas
    fillHandle: true, //esto crea celdas al jalar desde una esquinita
                        //language: 'es-MX',
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
        data: 'ICE 100%',
        
      },
      {
        data: 'TOTAL ICE 100%',
        //esto bloquea la celda para que solo sea de lectura
      },
      {
        data: 'ICE Credito Fiscal',
         //esto bloquea la celda para que solo sea de lectura
      },
      {
        data: 'TOTAL ICE Credito Fiscal',
        //esto bloquea la celda para que solo sea de lectura
      },
      {
        data: 'Descuento',
        
      },
      {
        data: 'TOTAL Descuento',
        //esto bloquea la celda para que solo sea de lectura
      },
    ], 
    
    licenseKey: 'non-commercial-and-evaluation'
  };

}
