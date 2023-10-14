import { Component } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import HyperFormula from 'hyperformula';
import { HotTableModule } from '@handsontable/angular';



@Component({
  selector: 'app-talonariosventas',
  templateUrl: './talonariosventas.component.html',
  styleUrls: ['./talonariosventas.component.css']
})
export class TalonariosventasComponent {
  constructor(private formBuilder: FormBuilder,
                

              ){
  }
  numberOfForms: number = 0;
  formArray: FormGroup[] = [];
  
   



  ngOnInit(){
    //const resultadoFormula = this.handsontable.getDataAtCell(0, 1); // Obtiene el valor de la celda con la fórmula
   //console.log("aquii",resultadoFormula); // Muestra el resultado en la consola


  }
  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });
  

  onNumberOfFormsChange() {
    this.addForms();
  }

 
  addForms() {
    this.formArray = [];
    for (let i = 0; i < this.numberOfForms; i++) {
      const form = this.formBuilder.group({
        field1: ['', Validators.required],
        field2: ['']
      });
      this.formArray.push(form);
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
    afterChange : function(changes,source) {
      //console.log("Changes:", changes, source);
      
      if (changes) {
        console.log("Changes:", changes[3]);
        changes.forEach((change, index, array) => {
          const oldValue = change[2]
          const value = change[3]
      
          if (value==='i'){//oldValue === value) {
            console.log("edddd")
            array[index] = value
          }
        })

      }
      return true
  },  
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
