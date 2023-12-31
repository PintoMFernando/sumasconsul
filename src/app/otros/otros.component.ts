import { ChangeDetectorRef, Component, HostListener, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import HyperFormula from 'hyperformula';

import { HotTableRegisterer } from '@handsontable/angular';
import { OtrossumasService } from '../services/otrossumas.service';
import { lastValueFrom, take } from 'rxjs';
import { otrossumas } from '../models/otrossumas.model';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.css'],
  providers: [ HotTableRegisterer ]
})
export class OtrosComponent {
  @Input() parametroDelPadreidcentralizadormes: string='';
  constructor(
              
    
    private hotRegistererotros: HotTableRegisterer,
  
    private cdr: ChangeDetectorRef,
    private dbLocal:LocalStorageService,
    ) { }  
    
    idtalonario = 'hotInstance';
    hotSettingsArray: any[] =[]; 
    bloqeuarboton:boolean =false;
    jsonOtrosArray:any = [];
    otros:string="";
    settingFormula = false;
     intervaloID: any;
     observaciones: string ="";
     sumatotalotros: number =0;
     sumaotros: number =0;
     idcentralizadormes:string ="";
     otrosarray: otrossumas= new otrossumas;
     otrosarray2:  otrossumas = new otrossumas();
    
  
  //PRUEBA Handsontable, DA
  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });

  ngOnInit(){
    
   // this.traermisdatos();// quitar traer mis datos
    this.misdatoslocalstorage();
    this.iniciarIntervalo();
  }
  @HostListener('window:popstate', ['$event']) //para caundo se vaya atras
  onPopState(event: any) {
    this.guardarLSDB();
  }

  @HostListener('window:beforeunload', ['$event']) //para cuando cierre el navegador
  onBeforeUnload(event: any) {
    this.guardarLSDB();
  }

  
  ngOnDestroy() {
    // Detén el intervalo cuando el componente se destruye para evitar fugas de memoria
    this.detenerIntervalo();
  }

  iniciarIntervalo() {
    this.intervaloID = setInterval(() => {
      this.guardar(); 
    }, 61000);
  }
  detenerIntervalo() {
    // Detén el intervalo utilizando el ID del intervalo almacenado
    if (this.intervaloID) {
      clearInterval(this.intervaloID);
    }
  }

  async misdatoslocalstorage(){

    this.dbLocal.traerdatosotroslocalstorage(this.parametroDelPadreidcentralizadormes)
    this.otrosarray = this.dbLocal.GetOtros()
    await this.crearmitabla();
    await this.cdr.detectChanges();
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
      this.hotRegistererotros.getInstance(this.idtalonario).setDataAtCell(0, 2,'=SUM(B:B)');
      this.settingFormula = false;
    }
    
  }, 
  afterGetColHeader: (col, th) => {
    // Personaliza los estilos para cada columna
    switch (col) {
      case 0:
        th.style.backgroundColor = '#3D69F4';
        break;
      case 1:
        th.style.backgroundColor = '#3D69F4';
        break;
        case 3:
          th.style.backgroundColor = '#3D69F4';
          break;
      // Agrega más casos para más columnas
    }
  },

    colHeaders: ['NombreCobro','Monto Bs','TOTAL','Observaciones'], //aqui se coloca lo nombres de columnas
    rowHeaders: true, //Aqui se coloca la numeracion de filas
    minSpareRows: 1,  //esto crea automaticamente las filas
    fillHandle: true, //esto crea celdas al jalar desde una esquinita
                        //language: 'es-MX',
    colWidths: [100, 90,50,330],               
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
      { data: 'nombrecobro',},
      { data: 'montootros',},
      { data: 'Total',
        readOnly: true,},
      { data: 'observaciones',},
    ], 
    hiddenColumns:{
       columns:[2],
    },
    
    licenseKey: 'non-commercial-and-evaluation'
  };
  
  this.hotSettingsArray.push(hotSettings);
  
  this.hotSettingsArray[0].data = this.otrosarray;
 
}
 
async guardar(){
 
  this.jsonOtrosArray=[];
  
  const matrizdata =this.hotRegistererotros.getInstance(this.idtalonario).getData()
  for (const fila of matrizdata) {
    if (fila[0] !== null || fila[2] !== null ) {
      const jsondata ={
      idotrossumas:uuidv4(),
      nombrecobro: fila[0]||"" ,
      montootros: fila[1] || 0,
      observaciones:fila[3]||"",
      idcentralizadormes: this.parametroDelPadreidcentralizadormes
      }
      this.jsonOtrosArray.push(jsondata)
    }
  
}
console.log("holos es el json",this.jsonOtrosArray);
await this.enviardatoslocalstorage();
 
}
async guardarLSDB(){
 
  this.jsonOtrosArray=[];
  
  const matrizdata =this.hotRegistererotros.getInstance(this.idtalonario).getData()
  for (const fila of matrizdata) {
    if (fila[0] !== null || fila[2] !== null ) {
      const jsondata ={
      idotrossumas:uuidv4(),
      nombrecobro: fila[0]||"" ,
      montootros: fila[1] || 0,
      observaciones:fila[3]||"",
      idcentralizadormes: this.parametroDelPadreidcentralizadormes
      }
      this.jsonOtrosArray.push(jsondata)
    }
  
}
console.log("holos es el json",this.jsonOtrosArray);
await this.guardardatoslocalstorageyDB();
 
}

async enviardatoslocalstorage(){
  this.dbLocal.traerdatosguardarotroslocalstorage(this.jsonOtrosArray)
}

async guardardatoslocalstorageyDB(){
  await this.dbLocal.traerdatosbuscarcrearborrarotros(this.parametroDelPadreidcentralizadormes,this.jsonOtrosArray)
}

}
