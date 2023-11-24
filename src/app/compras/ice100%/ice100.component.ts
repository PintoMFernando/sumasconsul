import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import HyperFormula from 'hyperformula';

import { HotTableRegisterer } from '@handsontable/angular';
import { ComprassumasService } from 'src/app/services/comprassumas.service';
import { ComprassumasdetalleService } from 'src/app/services/comprassumasdetalle.service';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'jquery';
import { lastValueFrom, take } from 'rxjs';
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
  
  
  constructor(private formBuilder: FormBuilder,
    public mesconcomprasumasservice: ComprassumasService,
     public comprassumasdetalleService:  ComprassumasdetalleService,
     private cdr: ChangeDetectorRef,
     private dbLocal:LocalStorageService,
     private route: ActivatedRoute,
    
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
    idcomprasuma: string =""; 
    datosMatriz: any[] = [];
    //datosTabla: any[] = [];
    datosTabla:  Comprassumas = new Comprassumas();
    datossumastabla: Comprassumasdetalle = new Comprassumasdetalle();
    //idd:string = "";
     settingFormula = false;
     intervaloID: any;
     itemcompras:  Comprassumas = new Comprassumas();
     idcentralizadormes: string='';
  
  //PRUEBA Handsontable, DA
  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });

  ngOnInit(){

    this.jsonComprassArray=[];
    this.jsonComprassTotalesArray=[];
   // this.miIdcentralizadormes();
    this.traerdatoslocalStoragecompras();
    //this.miid();
    this.iniciarIntervalo();
  
  }

  /*async miIdcentralizadormes(){
    const sources$ = this.mesconcomprasumasservice.getComprassumas(this.parametroDelPadreidcentralizadormes); //con esto traigo el id de centralizadormes al localstorage
    const datas:any = await lastValueFrom(sources$);
    this.dbLocal.SetCentralizadormes(datas[0].comprassumas.idcomprasuma);
  }*/

 async traerdatoslocalStoragecompras(){

    
   // let idcentralizadormes = Number(this.route.snapshot.paramMap.get('idcentralizadormes'));  //este es el id global de user
   
   // this.mesconcomprasumasservice.getComprassumas(this.parametroDelPadreidcentralizadormes).subscribe((data: any) => {
    const source$ = this.mesconcomprasumasservice.getComprassumas(this.parametroDelPadreidcentralizadormes); //con esto traigo el id
    const data:any = await lastValueFrom(source$); 
   // const idcomprasumas=data[0].comprassumas.idcomprasuma;
    this.idcomprasuma=data[0].comprassumas.idcomprasuma;
   //let idcentralizadormes=String(this.dbLocal.GetCentralizadormes().idcentralizadormes)
    

    const sources$ = this.comprassumasdetalleService.getComprassumassolodetalles(this.idcomprasuma);
    const dataa:any = await lastValueFrom(sources$);
   this.dbLocal.SetCompras(dataa);
   this.itemcompras = this.dbLocal.GetCompras();
   console.log("estoy actualixadnpoooooooooooooooooooooABAJODATAAA", dataa)
    console.log("estoy actualixadnpoooooooooooooooooooooABAJO", this.dbLocal.SetCompras(dataa))
    //this.idcomprasuma = itemcompras.comprassumas.idcomprasuma;
     this.datossumadetalles();

    
       
   // });

  }
  async actualizarlocalstorage(){
    const sources$ = this.comprassumasdetalleService.getComprassumassolodetalles(this.idcomprasuma);
    const dataa:any = await lastValueFrom(sources$);
     this.dbLocal.SetCompras(dataa);

  }
  
  ngOnDestroy() {
    // Detén el intervalo cuando el componente se destruye para evitar fugas de memoria
    this.detenerIntervalo();
  }

  iniciarIntervalo() {
    this.intervaloID = setInterval(() => {
      this.guardar(); 
    }, 60000);
  }
  detenerIntervalo() {
    // Detén el intervalo utilizando el ID del intervalo almacenado
    if (this.intervaloID) {
      clearInterval(this.intervaloID);
    }
  }

  async miid(){
  
    this.idcomprasuma="";
    const source$ = this.mesconcomprasumasservice.getComprassumas(this.parametroDelPadreidcentralizadormes); //con esto traigo el id
    const data:any = await lastValueFrom(source$);
    this.idcomprasuma = data[0].comprassumas.idcomprasuma;
    this.datossumadetalles();

   

   

   // this.itemcompras = this.dbLocal.GetCompras();
    //const idcomprasumas = datas[0].comprassumas.idcomprasuma;

    

  }

  async datossumadetalles(){
    console.log("ENTRA A DATOSSUMADETALLES");
   /*const source$ = this.comprassumasdetalleService.getComprassumassolodetalles(this.idcomprasuma);
   const data:any = await lastValueFrom(source$);
   console.log("SON MIS DATOS EN DATA", data);
   */
    let datosdecompras=this.dbLocal.GetCompras()
  // this.datosTabla=data;  //aqui estaba con data
   this.datosTabla=datosdecompras;

   //this.datosTabla=datosdecompras;
  //this.datosTabla.concat(data);

   /*this.datosTabla.forEach((obj:any) => {
                             obj.compras=obj.monto              
                     obj.DescuentoCompras=obj.descuento                 
                             obj.Gasolina=obj.montogasolina         
                                  obj.ICE=obj.ice100     
                     obj.ICECreditoFiscal=obj.icedreditofis                 
                         obj.DescuentoICE=obj.descuentoice100             

    delete obj.monto;
    delete obj.descuento;
    delete obj.montogasolina;
    delete obj.ice100;
    delete obj.icedreditofis; 
    delete obj.descuentoice100;
    
   
  });*/
 // this.hotSettingsArray=[];
  console.log("SON MIS DATOS CONVERTIDOS datos tabla", this.datosTabla);
  await this.crearmitabla();
  await this.cdr.detectChanges();
 
}

   
    //console.log("aAQUI VA MI DATA", data);
    
  

  crearmitabla(){
    const  hotSettings: Handsontable.GridSettings = {
      

    formulas: {
      engine: this.hyperformulaInstance,       //con esto funciona las formulas
    },
    data: [
      //{compras:'',DescuentoCompras: '',Total100:'=SUM(A:A)-SUM(B:B)',Gasolina:'',TotalGasolina:'=SUM(D:D)',ICE:'' ,ICECreditoFiscal:'',DescuentoICE: '',TOTALICE100:'=SUM(F:F)',TOTALICECreditoFiscal:'=SUM(G:G)', TOTALDescuento:'=SUM(H:H)', TOTALTODO:'=(I1-J1+K1)'}, 
     // {compras:25,DescuentoCompras: 25,Total100:      ''     ,Gasolina:       100, TotalGasolina:       25  ,ICE: 0,ICECreditoFiscal:0,DescuentoICE:  25, TOTALICE100:  0          ,TOTALICECreditoFiscal:0, TOTALDescuento:   0     , TOTALTODO:     0         }, 
      //{compras:25,DescuentoCompras: 25,Total100:       ''     ,Gasolina:       0,TotalGasolina:        25  ,ICE: 0,ICECreditoFiscal:0,DescuentoICE:  25, TOTALICE100:   0          ,TOTALICECreditoFiscal:0, TOTALDescuento:    0    , TOTALTODO:     0        }, 
     // {compras:0,DescuentoCompras: 25,Total100:        0    ,Gasolina:       0,TotalGasolina:        25  ,ICE: 0,ICECreditoFiscal:0,DescuentoICE:  25,  TOTALICE100:   0         ,TOTALICECreditoFiscal:0, TOTALDescuento:   0     , TOTALTODO:      0       }, 
      
    ], 
    
     
  
   
    
    afterFormulasValuesUpdate : (changes) => { //contiene el valor de la celda de las sumas
      
        this.sumacompra100 = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(0,2 );
       
        this.sumacompragasolina = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(1, 2);
       this.sumacompraice = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(2, 2);
        
       this.sumacompracf = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(3, 2);
        this.sumadescuento = this.hotRegisterer3.getInstance('tabla3').getDataAtCell(4, 2);
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
        this.hotRegisterer3.getInstance('tabla3').setDataAtCell(0, 2, '=SUM(A:A)-SUM(B:B)');// suma 100% * 
         this.hotRegisterer3.getInstance('tabla3').setDataAtCell(1, 2, '=SUM(D:D)');//gasolina *
         
         this.hotRegisterer3.getInstance('tabla3').setDataAtCell(2, 2, '=SUM(E:E)'); //ice *
         this.hotRegisterer3.getInstance('tabla3').setDataAtCell(3, 2, '=SUM(F:F)');//icecreiitofiscal
         this.hotRegisterer3.getInstance('tabla3').setDataAtCell(4, 2, '=SUM(G:G)');
         this.hotRegisterer3.getInstance('tabla3').setDataAtCell(5, 2, '=(C3-C4+C5)');
           
         //desde aqui saco el brutoexcento neto
         this.hotRegisterer3.getInstance('tabla3').setDataAtCell(6, 2, '=SUM(C1+C2+C3)'); //bruto
        

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
            th.style.backgroundColor = '#4b49c0';
            break;
            case 7:
            th.style.backgroundColor = '#4b49c0';
            break;
        // Agrega más casos para más columnas
      }
    },

    //colHeaders: ['Compras','Descuento Compras','Total100','Gasolina','Total Gasolina','ICE','ICE Credito Fiscal','Descuento ICE','TOTAL ICE 100%','TOTAL ICE Credito Fiscal','TOTAL Descuento','TOTAL TODO'], //aqui se coloca lo nombres de columnas
    colHeaders: ['Compras','Descuento Compras','Total100','Gasolina','ICE','ICE Credito Fiscal','Descuento ICE',], //aqui se coloca lo nombres de columnas
   
    //minRows:20, //pone por defecto cuantas filas habra
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
      columns: [2], // Esto oculta las columnas 
  }, 
  //hiddenRows: { rows: [0] }, 
  
    
    licenseKey: 'non-commercial-and-evaluation'
  };
    
  //const pruebaMatriz = [
   // {compra:'',DescuentoCompras: '',Total100:'=SUM(A:A)-SUM(B:B)',Gasolina:'',TotalGasolina:'=SUM(D:D)',ICE:'' ,ICECreditoFiscal:'',DescuentoICE: '',TOTALICE100:'=SUM(F:F)',TOTALICECreditoFiscal:'=SUM(G:G)', TOTALDescuento:'=SUM(H:H)', TOTALTODO:'=(I1-J1+K1)'}, 
   // {compra:25,DescuentoCompras: 25,Total100:      0      ,Gasolina:       0, TotalGasolina:       25  ,ICE: 0,ICECreditoFiscal:0,DescuentoICE:  25, TOTALICE100:  0          ,TOTALICECreditoFiscal:0, TOTALDescuento:   0     , TOTALTODO:     0         }, 
   // {compra:25,DescuentoCompras: 25,Total100:      0      ,Gasolina:       0, TotalGasolina:       25  ,ICE: 0,ICECreditoFiscal:0,DescuentoICE:  25, TOTALICE100:  0          ,TOTALICECreditoFiscal:0, TOTALDescuento:   0     , TOTALTODO:     0         }, 
     
   
  //];
 
  this.hotSettingsArray.push(hotSettings);
  //this.hotRegisterer3.getInstance('tabla3').getPlugin('formulas').render();

  //this.hotRegisterer3.getInstance('tabla3').setDataAtCell(0, 2, '=SUM(A:A)-SUM(B:B)');
  
  this.hotSettingsArray[0].data = this.datosTabla;
  this.datosTabla={};
  //this.datosTabla= [];
  //this.hotSettingsArray[0].data = pruebaMatriz;
  console.log("AQUI ESTAN MIS DATOS PARA LA TABLApero en lo que cree",this.datosTabla);
  
  console.log("AQUI ESTAN MIS DATOS PARA LA TABLAAAAAAAAAAAAAAAA",this.hotSettingsArray[0].data);
  //this.hotSettingsArray[0].data = pruebaMatriz;

  
}


async guardar(){
  /*this.bloqeuarboton= true;
  var readOnly= this.hotRegisterer3.getInstance('tabla3').getSettings().readOnly;
   this.hotRegisterer3.getInstance('tabla3').updateSettings({                         //esto bloquea la tabla
    readOnly: !readOnly
  });
*/

  



     //este id es la clave  
    const matrizdata =this.hotRegisterer3.getInstance('tabla3').getData();
    
    const jsondataTotalcompras ={
      idcomprasuma: this.idcomprasuma,
      tipo: 1,
      totalice: matrizdata[2][2],
      totalicecredito:matrizdata[3][2],
      total100:matrizdata[0][2],
      //totaldescuento100:matrizdata[1][2],
      //totalcompra100:matrizdata[0][2],     //es el principal de compras
      totalgasolina: matrizdata[1][2],     ///es el principal de gasolina
      //totalgasolinadesceunto:matrizdata[1][2],
      //totaldecuentoicecredito:matrizdata[1][2],
      //totaltodoicecredito:matrizdata[5][2],  //es el principla de creditofisacal
    
     
    }
   
  
    
    console.log("HOLSO ES MI AMTRIADATA",  matrizdata);
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


await this.insertardatos(jsondataTotalcompras);
console.log("holos es el json que contiene SUMASDETALLES",this.jsonComprassArray);
}

async insertardatos(totalcomprasjson:any){
  console.log("HOLSO ES EL MI id",this.idcomprasuma)
  const source$ = this.comprassumasdetalleService.getComprassumasdetalle(this.idcomprasuma); //con esto traigo el id
  const data:any = await lastValueFrom(source$);
  console.log("mis datos data",data)
  const resultado = data.find((item: any) => item.idcomprasuma === this.idcomprasuma); //buiscando si hay datos en mi tabla
  console.log("resultado",resultado);
  if(!resultado){ //esto cambiar quiza
        // creamos
        console.log("HOLOS NO HAY DATOS");
        //aqui colocar el json de comprassumas
        
       await this.comprassumasdetalleService.postComprasumadetalles(this.jsonComprassArray);
       await this.mesconcomprasumasservice.patchComprassumas(this.idcomprasuma, totalcomprasjson)
       this.jsonComprassArray=[];
  }else{
      //BORRAMOS Y creamos
      await this.comprassumasdetalleService.deleteComprasumadetalles(this.idcomprasuma);
      await this.comprassumasdetalleService.postComprasumadetalles(this.jsonComprassArray);
      await this.mesconcomprasumasservice.patchComprassumas(this.idcomprasuma, totalcomprasjson)
      this.jsonComprassArray=[];
      
    }

     this.actualizarlocalstorage();
     this.cdr.detectChanges();
  //tengo que preguntar si hay o no hjay datos
 
   // this.comprassumasdetalleService.postComprasumadetalles(this.jsonComprassArray)
   //pregunta con get si hay datos con ese id (hace post) crea los datos
        

   //this.comprassumasdetalleService.patchComprasumadetalles(this.jsonComprassArray);
   //hace un patch


}


}