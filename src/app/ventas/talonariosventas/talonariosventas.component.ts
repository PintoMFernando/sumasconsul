import { Component} from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import { CellMeta } from 'handsontable/settings';
import HyperFormula from 'hyperformula';
import { NuevomesService } from 'src/app/services/nuevomes.service';
import { ObservacionesService } from 'src/app/services/observaciones.service';





@Component({
  selector: 'app-talonariosventas',
  templateUrl: './talonariosventas.component.html',
  styleUrls: ['./talonariosventas.component.css']
})
export class TalonariosventasComponent {
  valorCelda: any; 

  hotRegisterer: any;
 
  
  
  constructor(private formBuilder: FormBuilder,
              public talonarios: NuevomesService, 
             )
             {
               let myVariable;
               //var example1: any;  
               //var hot :any;               
              }
  numberOfForms: number = 0;
  formArray: FormGroup[] = [];
  ultimoNumeroIngresado: number = 0;
  ultimoValorInputFinal: number = 0;
  inputFinal: number = 0;
  inputInicial: number = 0; 
  valorsuma: any;
  valorcasillas:any;
  datostalonarios:any = [];
   talonario={};
   botonPresionado: boolean = false;

  
   


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
      ['', '', '=SUM(B:B)'],               
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
    ],
    
    cells: (row, column, prop) => {
      const cellMeta: CellMeta = {};

      //cellMeta.afterGetCellMeta;
      
      console.log("ro_w:", row );
      console.log("column",column);
      console.log("prop", prop);
      console.log("que es?",cellMeta);
      var cell = row,col;  
      //cell.style.backgroundColor = "#EEE";
      //cellMeta.readOnly = true;
      //cellMeta.className = 'celda-readonly';
      
      return cellMeta;
    },
    
    afterChange : (changes,source) =>{
      console.log("Changes:", changes);
      
    if (changes) {
      //console.log("Changes:", changes[3]);
      changes.forEach((changes, index, array) => {
        const oldValue = changes[2]
        const value = changes[3]  //aqui esta el valor de las casillas
        console.log("aqui se encuentra el valor de la casilla",value);
       
         this.datostalonarios.push(value); //aqui se guarda los  valores de las sumas
         //this.valorCelda = value;
         // console.log("aqui estan los datos",this.datostalonarios);
         
        // console.log("mi array suma", suma);
        if(value== "i"){
          
          console.log("entra a iiiiii");
          
        }
      })
      
    }
    
     // return true
  },  
   afterFormulasValuesUpdate : (changes) => {
    changes.forEach((change) => {
      if ('newValue' in change) {
        console.log('Nuevo valor (newValue):', change.newValue);  //aqui esta el valor de suma
        this.valorsuma=change.newValue;
      }
      //console.log('aqui va change',change);

      const address = (change as any)['address'];

    if (address && typeof address.row === 'number'&& address && typeof address.col === 'number' ) {
      const valorRow = address.row;    //esto contiene el valor de la fila
      const valorCol = address.col;    //esto contiene el valor de la columna
      console.log('Valor de row:', valorRow);
      console.log('Valor de col:', valorCol);
      
    }
    
     //this.obs.createObservacion(this.valorsuma,this.valorsuma);
    //talonario.monto = ;
      ///console.log("aqui esta el valor de la suma",this.valorsuma);
      
      //this.datostalonarios.push(this.valorsuma);

    })
  },
   

  
    colHeaders: ['Nº Factura', 'Monto Bs','SUMA TOTAL'], //aqui se coloca lo nombres de columnas
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
        data: 'SUMA TOTAL',
        readOnly: true,
        className: 'bg-read-only',  
      },
    ], 
    licenseKey: 'non-commercial-and-evaluation'
    
  };


 /* handleChanges(changes: Handsontable.CellChange[]) {
    if (changes) {
      changes.forEach((change) => {
        const oldValue = change[2];
        const value = change[3]; // Aquí está el valor de las casillas
        console.log("aqui se encuentra el valor de la casilla", value);

        this.valorCelda = value; // Actualiza la variable valorCelda

        console.log("valorCelda:", this.valorCelda);
        // Aquí puedes realizar más acciones si lo necesitas
      });
    }
  }
  */ 
  guardarDatos(){
    console.log("aqui estan los datos",this.datostalonarios);
    console.log("aqui esta la suma", this.valorsuma);
    this.talonario={
         monto:this.datostalonarios,
         total:this.valorsuma
    }
    this.datostalonarios=[];
    this.valorsuma={};
    console.log("estos son todos los datos de talonarioa",this.talonario);
  }

}
