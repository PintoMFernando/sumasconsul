import { ChangeDetectorRef, Component, HostListener, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import HyperFormula from 'hyperformula';
import { HotTableRegisterer } from '@handsontable/angular';
import { ComprassumasService } from 'src/app/services/comprassumas.service';
import { ComprassumasdetalleService } from 'src/app/services/comprassumasdetalle.service';
import { v4 as uuidv4 } from 'uuid';
import { Comprassumasdetalle } from 'src/app/models/comprassumasdetalle';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Comprassumas } from 'src/app/models/comprassumas';

@Component({
  selector: 'app-ice100',
  templateUrl: './ice100.component.html',
  styleUrls: ['./ice100.component.css'],
  providers: [ HotTableRegisterer ]
})
export class Ice100Component {
  @Input() parametroDelPadreidcentralizadormes: string='';
  
  
  constructor(
    public mesconcomprasumasservice: ComprassumasService,
     public comprassumasdetalleService:  ComprassumasdetalleService,
     private cdr: ChangeDetectorRef,
     private dbLocal:LocalStorageService,
    private hotRegisterer3: HotTableRegisterer,
    ) { }  
    
    idtalonario = 'hotInstance';
    hotSettingsArray: any[] =[]; 
    bloqeuarboton:boolean =false;
    jsonComprassArray:any = [];
    jsonComprassTotalesArray:any = [];
    sumacompra100: number = 0;
    sumacompra100bruto: number = 0;
    sumacompra100excento: number = 0;
    sumacompra100neto: number = 0;

    sumacompragasolina: number = 0;
    sumacompragasolina30: number = 0;
    sumacompraice: number = 0;
    sumacompracf: number = 0;
    sumadescuento: number = 0;
    sumacompratotal: number = 0;
   
    idcomprasuma: any; 
    datosMatriz: any[] = [];
    
    datosTabla:  Comprassumas = new Comprassumas();
    datossumastabla: Comprassumasdetalle = new Comprassumasdetalle();
   
     settingFormula = false;
     intervaloID: any;
     itemcompras:  Comprassumas = new Comprassumas();
     idcentralizadormes: string='';
   idcomprassumas:any;
  
  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });

  ngOnInit(){

    this.jsonComprassArray=[];
    this.jsonComprassTotalesArray=[];
    this.traerdatoslocalStoragecompras();
    this.iniciarIntervalo();
  
  }
  @HostListener('window:popstate', ['$event']) //para caundo se vaya atras
  onPopState(event: any) {
    this.guardarDB_LS();
  }

  @HostListener('window:beforeunload', ['$event']) //para cuando cierre el navegador
  onBeforeUnload(event: any) {
    this.guardarDB_LS();
  }

  

 async traerdatoslocalStoragecompras(){

   await this.dbLocal.traerdatoscompraslocalstorage(this.parametroDelPadreidcentralizadormes)
    this.idcomprasuma = await this.dbLocal.GetCompras();
   
  
   await this.dbLocal.traerdatoscomprasdetalleslocalstorage(this.idcomprasuma)
   this.itemcompras = await this.dbLocal.GetComprasDetalles();
  
   
   
     await this.datossumadetalles();

    
       
   
  }
  async actualizarlocalstorage(){
    
    await  this.dbLocal.traerdatoscompraslocalstorage(this.parametroDelPadreidcentralizadormes);
    await  this.dbLocal.traerdatoscomprasdetalleslocalstorage(this.idcomprasuma);
    console.log("Paso 2 mis datos arrayaaaaaaaaaaaaaaaaaaaaaaaaa");
   
  }
  
  ngOnDestroy() {
    this.detenerIntervalo();
  }

  iniciarIntervalo() {
    this.intervaloID = setInterval(() => {
      this.guardar(); 
    }, 60000);
  }
  detenerIntervalo() {
    
    if (this.intervaloID) {
      clearInterval(this.intervaloID);
    }
  }



  async datossumadetalles(){
  let datosdecompras= this.dbLocal.GetComprasDetalles();
   this.datosTabla=datosdecompras;
  await this.crearmitabla();
  await this.cdr.detectChanges();
 
}

  crearmitabla(){
    const  hotSettings: Handsontable.GridSettings = {
      
    formulas: {
      engine: this.hyperformulaInstance,       //con esto funciona las formulas
    },
    data: [], 
    
    afterFormulasValuesUpdate : (changes) => { //contiene el valor de la celda de las sumas
      
        this.sumacompra100 = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(0,2 );
       
        this.sumacompragasolina = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(1, 2);
       this.sumacompraice = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(2, 2);
        
       this.sumacompracf = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(3, 2);
        this.sumadescuento = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(4, 2); //este es la suma desceunto
        this.sumacompratotal = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(5,2);


        this.sumacompra100bruto = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(6,2); //bruto
  
    // sumacompra100excento: 
    //sumacompra100neto: 

        this.sumacompragasolina30 = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(7,2);
        this.sumacompra100excento= this.hotRegisterer3.getInstance('tabla3').getDataAtCell(8,2);//excento
        this.sumacompra100neto= this.hotRegisterer3.getInstance('tabla3').getDataAtCell(9,2);//NETO
  
    },
    afterChange : (changes,source) =>{ //se supone que contiene el valor de de las formulas
      if (!this.settingFormula) {
        this.settingFormula = true;
        this.hotRegisterer3.getInstance('tabla3').setDataAtCell(0, 2, '=SUM(A:A)');// suma 100% * 
         this.hotRegisterer3.getInstance('tabla3').setDataAtCell(1, 2, '=SUM(D:D)');//gasolina *
         
         this.hotRegisterer3.getInstance('tabla3').setDataAtCell(2, 2, '=SUM(E:E)'); //ice *
         this.hotRegisterer3.getInstance('tabla3').setDataAtCell(3, 2, '=SUM(F:F)');//icecreiitofiscal
         this.hotRegisterer3.getInstance('tabla3').setDataAtCell(4, 2, '=SUM(G:G)');
         this.hotRegisterer3.getInstance('tabla3').setDataAtCell(5, 2, '=(C3-C4)');
           
         //desde aqui saco el brutoexcento neto
         this.hotRegisterer3.getInstance('tabla3').setDataAtCell(6, 2, '=SUM(C1+C2+C3+C5)'); //bruto
        

           //GASOLINA SUMA
           this.hotRegisterer3.getInstance('tabla3').setDataAtCell(7, 2, '=SUM(D:D)*30%');
           //ICE TOTAL
           this.hotRegisterer3.getInstance('tabla3').setDataAtCell(8, 2, '=C8+C3-C4'); //excento
           this.hotRegisterer3.getInstance('tabla3').setDataAtCell(9, 2, '=C7-C9'); //neto

          

        this.settingFormula = false;
      }
          
    },  
  
    afterGetColHeader: (col, th) => {
      // Personaliza los estilos para cada columna
      switch (col) {
        case 0:
          th.style.backgroundColor = '#be3232';
          break;
        case 1:
          th.style.backgroundColor = '#be3232';
          break;
        case 2:
          th.style.backgroundColor = '#be3232';
          break;
        case 3:
          th.style.backgroundColor = '#32be61';
          break;
          case 4:
            th.style.backgroundColor = '#4b49c0';
            break;
          case 5:
            th.style.backgroundColor = '#4b49c0';
            break;
            case 6:
            th.style.backgroundColor = '#696969';
            break;
            case 7:
            th.style.backgroundColor = '#696969';
            break;
        // Agrega más casos para más columnas
      }
    },

      colHeaders: ['Compras','Descuento Compras','Total100','Gasolina','ICE','ICE Credito Fiscal','Descuento ',], //aqui se coloca lo nombres de columnas
   
    //minRows:20, //pone por defecto cuantas filas habra
    rowHeaders: true, //Aqui se coloca la numeracion de filas
    minSpareRows: 1,  //esto crea automaticamente las filas
    fillHandle: true, //esto crea celdas al jalar desde una esquinita
                        //language: 'es-MX',
    colWidths: [100, 100,100,100, 100,100,100],     
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
      { data: 'monto', },
      { data: 'descuento',},
      { data: 'Total100',
        readOnly: true, 
      },
      { data: 'montogasolina',},
     // { data: 'TotalGasolina',
       // readOnly: true, 
      //},
      { data: 'ice100',},
      { data: 'icecreditofis',},
      { data: 'descuentoice100',},
      /*{ data: 'TOTALICE100',
        readOnly: true, 
      },
      { data: 'TOTALICECreditoFiscal',
        readOnly: true, 
      },
      { data: 'TOTALDescuento',
        readOnly: true, 
      },*/
     /* { data: 'TOTALTODO',
        readOnly: true, 
      },*/
      
    ],
    hiddenColumns: {
      columns: [1,2], // Esto oculta las columnas 
  }, 
  //hiddenRows: { rows: [0] }, 
  
    
    licenseKey: 'non-commercial-and-evaluation'
  };
    
 
 
  this.hotSettingsArray.push(hotSettings);
  this.hotSettingsArray[0].data = this.datosTabla;
  this.datosTabla={};
  

  
}


async guardar(){
 
    this.jsonComprassArray=[];
    const matrizdata =this.hotRegisterer3.getInstance('tabla3').getData();
    
   
  for (const fila of matrizdata) {
    console.log("tamanio de fila ", fila.length)
    if (fila[0] !== null || fila[1] || fila[2] !== null || fila[3] !== null|| fila[4] !== null || fila[5] !== null || fila[6] !== null) {
      const jsondataice100 ={
           idcomprasumadetalle:uuidv4(),
           monto:fila[0] || 0,
           descuento:fila[1] || 0,
           montogasolina:fila[3] || 0,
           ice100:fila[4] || 0,
           icecreditofis:fila[5] || 0,
           descuentoice100:fila[6] || 0,
           idcomprasuma:this.idcomprasuma,
      }
      this.jsonComprassArray.push(jsondataice100) 
    }
}

await this.insertardatos(this.jsonComprassArray);
}

async guardarDB_LS(){
 
  this.jsonComprassArray=[];
  const matrizdata =this.hotRegisterer3.getInstance('tabla3').getData();
  
 
for (const fila of matrizdata) {
  console.log("tamanio de fila ", fila.length)
  if (fila[0] !== null || fila[1] || fila[2] !== null || fila[3] !== null|| fila[4] !== null || fila[5] !== null || fila[6] !== null) {
    const jsondataice100 ={
         idcomprasumadetalle:uuidv4(),
         monto:fila[0] || 0,
         descuento:fila[1] || 0,
         montogasolina:fila[3] || 0,
         ice100:fila[4] || 0,
         icecreditofis:fila[5] || 0,
         descuentoice100:fila[6] || 0,
         idcomprasuma:this.idcomprasuma,
    }
    this.jsonComprassArray.push(jsondataice100) 
  }
}

await this.insertardatosDB_lc(this.jsonComprassArray);
}


async insertardatos(jsonComprassArray:any){
        await this.dbLocal.postComprasumadetalleslocal(jsonComprassArray);
}


async insertardatosDB_lc(jsonComprassArray:any){
  await this.dbLocal.postComprasumadetallesDB_Local(this.idcomprasuma,jsonComprassArray);
}

}