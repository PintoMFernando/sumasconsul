import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import HyperFormula from 'hyperformula';


@Component({
  selector: 'app-talonariosprevalorados',
  templateUrl: './talonariosprevalorados.component.html',
  styleUrls: ['./talonariosprevalorados.component.css']
})
export class TalonariosprevaloradosComponent {

  
  numberOfFormss: number = 0;
  formArray2: FormGroup[] = [];
  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });
   

  constructor(private formBuilder: FormBuilder) { }

  // Detecta cambios en el valor del número de formularios

  onNumberOfFormsChange2(){
    this.addForms2();
  }


  addForms2() {
    this.formArray2 = [];
    for (let i = 0; i < this.numberOfFormss; i++) {
      const form2 = this.formBuilder.group({
        field1: ['', Validators.required],
        field2: ['']
      });
      this.formArray2.push(form2);
    }
  }



  hotSettings: Handsontable.GridSettings = {
    formulas: {
      engine: this.hyperformulaInstance,       //con esto funciona las formulas
    },
    data: [
      ['', '67', '=SUM(B:B)'],               
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
    ],   
    colHeaders: ['Nº Factura', 'Monto Bs','SUMA'], //aqui se coloca lo nombres de columnas
    rowHeaders: false, //Aqui se coloca la numeracion de filas
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
        data: 'NºFactura',
        readOnly: true    //esto bloquea la celda para que solo sea de lectura
      },
      {
        data: 'Monto Bs',
        
      },
      {
        data: 'SUMA',
        
      },
    ], 
    licenseKey: 'non-commercial-and-evaluation'
  };

  



}
