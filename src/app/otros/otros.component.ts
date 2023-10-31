import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import HyperFormula from 'hyperformula';

import { HotTableRegisterer } from '@handsontable/angular';



@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.css'],
  providers: [ HotTableRegisterer ]
})
export class OtrosComponent {

  constructor(private formBuilder: FormBuilder,
    
    private hotRegistererotros: HotTableRegisterer,
    ) { }  
    
    idtalonario = 'hotInstance';
    hotSettingsArray: any[] =[]; 
    bloqeuarboton:boolean =false;
    jsonComprassArray:any = [];
    otros:string="";
    settingFormula = false;
     intervaloID: any;
     observaciones: string ="";
     sumatotalotros: number =0;
     sumaotros: number =0;

    
  
  //PRUEBA Handsontable, DA
  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });

  ngOnInit(){
    this.crearmitabla();
  }


  crearmitabla(){
  const hotSettings: Handsontable.GridSettings = {
    formulas: {
      engine: this.hyperformulaInstance,       //con esto funciona las formulas
    },
    data: [
      //['', '=SUM(A:A)', ''],               
    ],   

    afterFormulasValuesUpdate : (changes) => { //contiene el valor de la celda de las sumas
     
      this.sumaotros = this.hotRegistererotros.getInstance(this.idtalonario).getDataAtCell(0, 0);
      this.observaciones = this.hotRegistererotros.getInstance(this.idtalonario).getDataAtCell(0,2);
      this.sumatotalotros = this.hotRegistererotros.getInstance(this.idtalonario).getDataAtCell(0,1 );
     

  },
  afterChange : (changes,source) =>{ //se supone que contiene el valor de de las formulas
    if (!this.settingFormula) {
      this.settingFormula = true;
      this.hotRegistererotros.getInstance(this.idtalonario).setDataAtCell(0, 1,'=SUM(A:A)');

      this.settingFormula = false;
    }
    
  }, 
  afterGetColHeader: (col, th) => {
    // Personaliza los estilos para cada columna
    switch (col) {
      case 0:
        th.style.backgroundColor = '#3D69F4';
        break;
      case 2:
        th.style.backgroundColor = '#3D69F4';
        break;
      // Agrega más casos para más columnas
    }
  },

    colHeaders: ['Monto Bs','TOTAL','Observaciones'], //aqui se coloca lo nombres de columnas
    rowHeaders: true, //Aqui se coloca la numeracion de filas
    minSpareRows: 1,  //esto crea automaticamente las filas
    fillHandle: true, //esto crea celdas al jalar desde una esquinita
                        //language: 'es-MX',
    colWidths: [65, 50, 350],               
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
      { data: 'MontoBs',},
      { data: 'Total',
        readOnly: true,},
      { data: 'Observaciones',},
    ], 
    hiddenColumns:{
       columns:[1],
    },
    
    licenseKey: 'non-commercial-and-evaluation'
  };
  this.hotSettingsArray.push(hotSettings);

}
 
guardar(){
  this.bloqeuarboton= true;
  var readOnly= this.hotRegistererotros.getInstance(this.idtalonario).getSettings().readOnly;
   this.hotRegistererotros.getInstance(this.idtalonario).updateSettings({                         //esto bloquea la tabla
    readOnly: !readOnly
  });

  console.log("HOLSO ES EL DATA",  this.hotRegistererotros.getInstance(this.idtalonario).getData());
  
  const matrizdata =this.hotRegistererotros.getInstance(this.idtalonario).getData()
  for (const fila of matrizdata) {
    if (fila[0] !== null ) {
      const jsondata ={
      monto: fila[0],
      total:fila[1],
      observaciones:fila[2]||"",
      }
      this.jsonComprassArray.push(jsondata)
    }
  
}
console.log("holos es el json",this.jsonComprassArray);
 
}
}
