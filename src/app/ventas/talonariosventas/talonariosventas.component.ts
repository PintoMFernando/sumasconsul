import { AfterViewInit, Component, ElementRef, Input, SimpleChanges, ViewChild} from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
//import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import { CellMeta } from 'handsontable/settings';
import HyperFormula from 'hyperformula';
import { NuevomesService } from 'src/app/services/nuevomes.service';
import { ObservacionesService } from 'src/app/services/observaciones.service';

import Handsontable from 'handsontable/base';
import { HotTableRegisterer } from '@handsontable/angular';
import { ConfirmationService, ConfirmEventType,MessageService } from 'primeng/api';
import { VentatalonarioService } from 'src/app/services/ventatalonario.service';
import { SumatalonarioService } from 'src/app/services/sumatalonario.service';
import { v4 as uuidv4 } from 'uuid';
//import * as Handsontable from 'handsontable';


@Component({
  selector: 'app-talonariosventas',
  templateUrl: './talonariosventas.component.html',
  styleUrls: ['./talonariosventas.component.css'],
  providers: [ HotTableRegisterer ]
})
export class TalonariosventasComponent   {
  @Input() idmespuntoventasuma: any;  
  @Input() idpuntoventaactividad: any;  
  @Input() nombreactividad: any;  
  @Input()  parametroDelPadreidcentralizadormes: any;  
  
  valorCelda: any; 

 
  
  constructor(private formBuilder: FormBuilder,
              public talonarios: NuevomesService, 
              private hotRegisterer: HotTableRegisterer,
              public ventastalonarioService: VentatalonarioService,
              public sumatalonarioService: SumatalonarioService,
              public messageService: MessageService,
              //private hot: Handsontable,
             
             )
             {
               let myVariable;
               //var example1: any;  
               //var hot :any;               
              }
              
  numberOfForms: number = 0;
  formArray: FormGroup[] = [];
  hotSettingsArray: any[] =[]; //esto contiene todas mis isntancias de handsontable
  hotDataArray =[];
  tablesSettings: Handsontable.GridSettings[] = [];

  obsArray=[];
  ultimoNumeroIngresado: number = 0;
  ultimoValorInputFinal: number = 0;
  inputFinal: number = 0;
  inputInicial: number = 0; 
  valorsuma: any;
  valorcasillas:any;
  botonPresionado: boolean = false;
  
  factinicial: number[]=[];
  factfinal: number[]=[];
  montodinamico: number=0;
  agregarFilas: boolean[] = [];
  //idtalonario = 'hotInstance';
  
  rango: number=0;
 
  numerotalonario: number =0;
  postArray: any[] =[];
  
  contadorfilas:number =0;
  tipotalonario:number = 1; 
  botonBloqueado: boolean = false;
  habilitarinicio:boolean=false;
  habilitarfin:boolean=false;
  actividad: string="";
 //datostalonarios:datostalonario={};
 //talonario: talonarioventa={};
  jsonDatosArray:any = [];
  jsonDatossumasArray:any = [];
  estado:number=0;
  talonario: any[] =[];
  arrayTabla :any[]=[];

  
  ngOnInit(){
    this.traertablasventas();
    //const resultadoFormula = this.handsontable.getDataAtCell(0, 1); // Obtiene el valor de la celda con la fórmula
    //console.log("aquii",resultadoFormula); // Muestra el resultado en la consola
     console.log("aqui esta el id de punto venta", this.idmespuntoventasuma);
     
  }


  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });
  

  onNumberOfFormsChange() {
    this.actualizarFormularios();
  }

  private actualizarFormularios() {
   
    //const cantidadFormularios = this.numberOfForms;
    //this.crearFormularios(cantidadFormularios );
    const cantidadFormularios = this.numberOfForms;
    const formulariosActuales = this.hotSettingsArray.length;
    const ultimoValor = this.hotSettingsArray.length-1; 
    
    
    
    if (cantidadFormularios > formulariosActuales) {
      this.crearFormularios(cantidadFormularios,formulariosActuales);
    }else if(cantidadFormularios< formulariosActuales){ //aqui quiere reducir 
         if(this.hotRegisterer.getInstance('talonario'+ultimoValor).getData()[0][0] !== null  ){ // tiene datos no quita tiene dato
          console.log("no puedes quitar fromulariopor que hay datos");//mandar mensaje 
          this.messageService.add({ severity: 'error', summary: 'CUIDADO ', detail: 'No se puede Quitar el Talonairo por que Hay datos en el ' });
         }else{
          this.hotSettingsArray.pop()
         }
    }
     
     
  }
  private crearFormularios(cantidad: number,valoaumentar:number) {
    //if(this.hotRegisterer.getInstance('talonario'+index).getData()) ==)
    //this.hotSettingsArray =[];
    
  
    for ( let i = valoaumentar; i < cantidad; i++) {
     
      const form = this.formBuilder.group({
        
        field1: ['', Validators.required],
        field2: ['']
      });
      const  isHotReadOnly: boolean = false;//ver esto para bloquear la tabla
      const hotSettings: Handsontable.GridSettings = {
        formulas: {
          engine: this.hyperformulaInstance,       //con esto funciona las formulas
        },
        
        data: [
          ['','', '=SUM(B:B)'],               
          
        ],
       
        afterChange : (changes,source) =>{
        if (changes || source === 'edit') {
          //console.log("Changes:", changes[3]);
          changes!.forEach((changes, index, array) => {
            const oldValue = changes[2]
            const row = changes[0];
            const value = changes[3]  //aqui esta el valor de las casillas
            const col =changes[1];
            const rowCount = this.hotRegisterer.getInstance('talonario'+i).countRows();
            
              if (col === 'Monto Bs') {
               // console.log("entra al col",col);
                //const numero = parseInt(value, 10);
                if (value) {
                 
                    this.hotRegisterer.getInstance('talonario'+i).setDataAtCell(row, 0, this.factinicial[i] + row); //con esto pone automaticamente numeros siempre y cuando ponga fact inicial
                
                  
                  }
             
            
            switch (value) {
              case 'I':
              case 'i':
                this.hotRegisterer.getInstance('talonario'+i).setCellMeta(changes[0], 1, 'className', 'colornegro');//esto cambia el color de la celda
                break;
              case 'A': 
              case 'a':
                this.hotRegisterer.getInstance('talonario'+i).setCellMeta(changes[0], 1, 'className', 'colorrojo');
                break;
              case 'E':
              case 'e':
                this.hotRegisterer.getInstance('talonario'+i).setCellMeta(changes[0], 1, 'className', 'colorazul');
                break;
              default:
                this.hotRegisterer.getInstance('talonario'+i).setCellMeta(changes[0], 1, 'className', 'colorblanco');
                break;
            }
            this.hotRegisterer.getInstance('talonario'+i).render(); 
            
          }
            
          })
          
        }
        
         // return true
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
            //readOnly: false,    //esto bloquea la celda para que solo sea de lectura
            //editor: false,
            type: 'numeric',
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
     
      this.hotSettingsArray.push(hotSettings);
    }

    console.log("AQUI ESTA MI ARRAY", this.hotSettingsArray)
    console.log("AQUI ESTA EL TAMANIO DE MI ARRAY", this.hotSettingsArray.length)
    console.log("AQUI ESTA MI CANTIDAD", cantidad)
  }
  
 
  

 
 /* addForms() {
    this.numerotalonario= this.numberOfForms;
    

    console.log("nuero de talnaoris",this.numerotalonario);
    if(this.hotSettingsArray.length ===0){ //pregunta si esta vacio
      this.crearmistablascompletos();
    }
    else{
      
      if(this.numberOfForms > this.hotSettingsArray.length ){ //es mayor al numero? osea quiere aumentar 
       
       
          this.crearmistablascompletos();
          
      }
      else{
        this.hotSettingsArray.pop(); //quiere quitar pero cuantas veces quitare???? no hay ese calculo 
        
       
      }
    }
  }*/



  onidChange(index: number){
    //const newValue = this.talonario[index];
    for (let i = 0; i < this.talonario.length; i++) {
      if( index === this.talonario[i]){
        this.talonario.pop();
      }
    }
   
   // console.log("mi index",index)
   // console.log("mi talonario",this.talonario)
    this.talonario.push(index);

  }
   
  

 async guardarDatos(index:number){
    for (let i = 0; i< this.hotSettingsArray.length; i++) {
    const iduuid =uuidv4();
    const matriz=this.hotRegisterer.getInstance('talonario'+i).getData();
  
    const jsontalonario = {
      idventatalonario: iduuid,
      numtalonario: i+1,
      factinicial: Number(this.factinicial[i]),
      factfinal: Number(this.factfinal[i]),
      tipo: Number(this.tipotalonario),
      montototal: Number(matriz[0][2])|| 0, //o this.valorsuma
      idpuntoventaactividad:String(this.idpuntoventaactividad),
      idcentralizadormes:String(this.idmespuntoventasuma)
    };
    
    this.jsonDatosArray.push(jsontalonario);//AQUI ESTA MIS DATOS DE LA TABLA EN FORMATO JSON
   // console.log("tamanio matriz sin null",matrizFiltrada.length)
   //map()
   for (const fila of matriz) {
    
     if (fila[0] !== null ) {
     
      switch (fila[1]) {
        case 'A':
        case 'a':
          console.log("entra a A??", fila[1], this.estado);
          this.estado = 1;
          fila[1]=0;
          break;
        case 'E':
        case 'e':
          console.log("entra a E??", fila[1]);
          this.estado = 2;
          fila[1]=0;
          break;
        case 'I':
        case 'i':
          console.log("entra a I??", fila[1]);
          this.estado = 3;
          fila[1]=0;
          break;
        default:
          this.estado=0;
          break;
      }
      //this.jsonDatossumasArray=[];
      const jsonsumatalonario ={
        idsumatalonario:uuidv4(),
        numfactura: Number(fila[0]),
        monto: Number(fila[1]),
        estado: Number(this.estado),
        idventatalonario:String(iduuid),
       
      }
       this.jsonDatossumasArray.push(jsonsumatalonario)
    }
   
  }
  const jsondatosTodo ={
       arraytalonario: this.jsonDatosArray,
       arraysumatalonario: this.jsonDatossumasArray
  }
  this.jsonDatosArray=[];
  this.jsonDatossumasArray=[];
  this.arrayTabla.push(jsondatosTodo);
 
    
   this.valorsuma={};
   this.rango=0
   //this.factfinal=0;
   //this.factinicial=0;
   this.montodinamico=0; 
   
   //await this.ventastalonarioService.createVentatalonario(this.jsonDatosArray);
   //await this.sumatalonarioService.createSumatalonario(this.jsonDatossumasArray);
}
console.log("AQUI DEBEWRIA ESTAR TODOS MISA DATOS PARA RECORRER",this.arrayTabla);
this.guardarTalonarioslocalstorage(this.arrayTabla);

this.guardarTalonarios(this.arrayTabla);//con esto guarda en la db
  }


  guardarTalonarioslocalstorage(arrayTalonarios:any){
      //falta guardar localstorage

 }
 
 
  async guardarTalonarios(arrayTalonarios:any){
     arrayTalonarios.forEach(async (json :any) => {
      
      console.log("aqui tendria que estar mi talonario",json.arraytalonario); //aqui ahcer el await
      console.log("aqui tendria que estar mis sumas???",json.arraysumatalonario); 
      await this.ventastalonarioService.createVentatalonario(json.arraytalonario);
     await this.sumatalonarioService.createSumatalonario(json.arraysumatalonario);
  });
  
  

    
      
  }


  anulacionChange(index:number){
     //nos quedamos aqui
    
    
     if(this.agregarFilas[index]==true){
     this.agregarFilas[index]=false;
     this.rango = this.factfinal[index]-this.factinicial[index];
     console.log("aqui estan mi rango",this.rango);
    for (var i=0; i<= this.rango; i++) {

      const fact=this.factinicial[index];
      this.hotRegisterer.getInstance('talonario'+index).alter('insert_row_below');   //esto crea las columnas que yo quiera
      this.hotRegisterer.getInstance('talonario'+index).setDataAtCell(i,0,this.factinicial[index]);
      this.hotRegisterer.getInstance('talonario'+index).setDataAtCell(i,1,this.montodinamico);//aqui pone los datos en la casillas
      //this.datostalonarios.push({monto:this.montodinamico}); 
    }
  
    console.log("aqui estan mi checkbox",this.agregarFilas[index],0,this.factinicial[index]);
    console.log("aqui estan mi checkbox",this.agregarFilas[index],1,this.montodinamico);
    
    
    //aqui se tendria  que bloquear la tabla  
  
}
} 

bloqueartabla(index:number){
  this.hotSettingsArray[index].bloqueada=true;
  
  this.botonBloqueado = true;
  this.habilitarinicio=true;
  this.habilitarfin=true;
}

async traertablasventas(){


    
}

}