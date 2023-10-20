import { AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
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

//import * as Handsontable from 'handsontable';


@Component({
  selector: 'app-talonariosventas',
  templateUrl: './talonariosventas.component.html',
  styleUrls: ['./talonariosventas.component.css'],
  providers: [ HotTableRegisterer ]
})
export class TalonariosventasComponent   {
  @Input() idpuntoventa: any;  

  
  valorCelda: any; 

 
  
  constructor(private formBuilder: FormBuilder,
              public talonarios: NuevomesService, 
              private hotRegisterer: HotTableRegisterer,
              private confirmationService: ConfirmationService, 
              private messageService: MessageService,
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
  obsArray=[];
  ultimoNumeroIngresado: number = 0;
  ultimoValorInputFinal: number = 0;
  inputFinal: number = 0;
  inputInicial: number = 0; 
  valorsuma: any;
  valorcasillas:any;
   botonPresionado: boolean = false;
  factinicial: number=0;
  factfinal: number=0;
   idtalonario = 'hotInstance';
   agregarFilas: boolean = false;
  rango: number=0;
  montodinamico: number=0;
 numerotalonario: number =0;
 postArray: any[] =[];
 contador:number =0;
 contadorfilas:number =0;
 tipotalonario:number = 1; 
  botonBloqueado: boolean = false;
  habilitarinicio:boolean=false;
  habilitarfin:boolean=false;
 //datostalonarios:datostalonario={};
 //talonario: talonarioventa={};
  jsonDatosArray:any = [];
  jsonDatossumasArray:any = [];
  
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
        this.hotSettingsArray.pop();
        this.contador--;
        console.log("quiere quitar");
        console.log("aqui esta mi array de tablas", this.hotSettingsArray);
        console.log("aqui esta el id de cada tabla",this.idtalonario );
      }
    }
  }

  crearmistablascompletos(){
    
    this.numerotalonario=this.numberOfForms-this.hotSettingsArray.length;
    for (let i = 1; i <= this.numerotalonario; i++) {
         this.contador++;
         

      const form = this.formBuilder.group({
        
        field1: ['', Validators.required],
        field2: ['']
      });
      this.formArray.push(form);
      const  isHotReadOnly: boolean = false;
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
            const rowCount = this.hotRegisterer.getInstance(this.idtalonario).countRows();
            
              if (col === 'Monto Bs') {
                console.log("entra al col",col);
                //const numero = parseInt(value, 10);
                if (value) {
                  
                  this.hotRegisterer.getInstance(this.idtalonario).setDataAtCell(row, 0, this.factinicial + row); //con esto pone automaticamente numeros siempre y cuando ponga fact inicial
                }
             
            
            switch (value) {
              case 'I':
              case 'i':
                this.hotRegisterer.getInstance(this.idtalonario).setCellMeta(changes[0], 1, 'className', 'colornegro');//esto cambia el color de la celda
                break;
              case 'A': 
              case 'a':
                this.hotRegisterer.getInstance(this.idtalonario).setCellMeta(changes[0], 1, 'className', 'colorrojo');
                break;
              case 'E':
              case 'e':
                this.hotRegisterer.getInstance(this.idtalonario).setCellMeta(changes[0], 1, 'className', 'colorazul');
                break;
              default:
                this.hotRegisterer.getInstance(this.idtalonario).setCellMeta(changes[0], 1, 'className', 'colorblanco');
                break;
            }
            this.hotRegisterer.getInstance(this.idtalonario).render(); 
            
          }
            
          })
          
        }
        
         // return true
      },  
    
      
       afterFormulasValuesUpdate : (changes) => {
        changes.forEach((change) => {
          if ('newValue' in change) {
            //console.log('Nuevo valor (newValue):', change.newValue);  //aqui esta el valor de suma
            this.valorsuma=change.newValue;
          }
          //console.log('aqui va change',change);
    
          const address = (change as any)['address'];
    
        if (address && typeof address.row === 'number'&& address && typeof address.col === 'number' ) {
          const valorRow = address.row;    //esto contiene el valor de la fila
          const valorCol = address.col;    //esto contiene el valor de la columna
          //console.log('Valor de row:', valorRow);
          //console.log('Valor de col:', valorCol);
          
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
            readOnly: false,    //esto bloquea la celda para que solo sea de lectura
           
            editor: false,
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
    
      //hotSettings['id'] = tableId;
      this.hotSettingsArray.push(hotSettings);
      console.log("aqui esta mi array de tablas", this.hotSettingsArray);
      console.log("aqui esta el id de cada tabla",this.idtalonario );
    };
     
  }
   
  

  guardarDatos(index:number){
    this.bloqueartabla(index);
    let estado=0;
    //console.log("aqui estan los datos en JSON",this.valorestalonario);
    //console.log("aqui estan los datos",this.datostalonarios);
    //console.log("aqui esta la suma", this.valorsuma);
    const matriz=this.hotRegisterer.getInstance(this.idtalonario).getData();
    //const matrizFiltrada = matriz.filter((valor) => valor !== null);
    console.log("AQUI ESTA TODO MI DATA", this.hotRegisterer.getInstance(this.idtalonario).getData());
   // console.log("SERA QUE TRAe todo data sin junll", matrizFiltrada);
   // console.log("tamanio",matriz.length)
   // console.log("tamanio matriz sin null",matrizFiltrada.length)
   for (const fila of matriz) {
     if (fila[0] !== null ) {
  
      const jsontalonario = {
        numtalonario: this.contador,
        factinicial: this.factinicial,
        factfinal: this.factfinal,
        tipo: this.tipotalonario,
        montototal: fila[2]||'', //o this.valorsuma
        archivo:'',
        idpuntoventa: this.idpuntoventa,
      };
      if(fila[1]=== 'a' || 'A' ){
             estado= 1;
       }
       if(fila[1]=== 'e'|| 'E'){
        estado= 2;
       }
      if(fila[1]=== 'i'|| 'I' ){
         estado= 3;
      }
      const jsonsumatalonario ={

        numfactura: fila[0],
        monto: fila[1],
        estado: '',
       
      }
      console.log("AQUI ESTA MI JSON DE TALONARIO",jsontalonario);
      console.log("AQUI ESTA MI JSON DE SUMATALONARIO",jsonsumatalonario);
      // Agrega el objeto JSON al arreglo
      
      this.jsonDatosArray.push(jsontalonario);//AQUI ESTA MIS DATOS DE LA TABLA EN FORMATO JSON
      this.jsonDatossumasArray.push(jsonsumatalonario)
    }
    console.log("mi talonario id??",this.contador)
  }
   console.log("Aqui esta todo mi array con json TALONARIO",this.jsonDatosArray);
   console.log("Aqui esta todo mi array con json SUMAS TALONARIO",this.jsonDatossumasArray);
 
    this.valorsuma={};
    this.rango=0
    this.factfinal=0;
    this.factinicial=0;
    this.montodinamico=0;
    //console.log("estos son todos los datos de talonarioa",this.talonario); //aqui esta todos mi datos
   // for (let i = 0; i <= this.postArray.length; i++) {
    //  if(this.postArray[i].talonario.numtalonario == this.contador){
     //     console.log("Este dato ya esta guardado");
    //  }else{
       // this.postArray.push(this.talonario);
    //  }

   // }
   //console.log("SERA QUE TRAE TODO EL DATA?", this.hotRegisterer.getInstance(this.idtalonario).getData() );
   //console.log("SERA QUE TRAE TODO 666?", this.hotRegisterer.getInstance(this.idtalonario).getData()[0][0] ); //esto trae todo el data en una matriz
    //console.log("estos son todos los datos de talonarios ara meter",this.postArray); //para empujar
    //this.talonario={};
  }

  anulacionChange(){
     //nos quedamos aqui
    
    
     if(this.agregarFilas==true){
     this.agregarFilas=false;
     this.rango = this.factfinal-this.factinicial;
     console.log("aqui estan mi rango",this.rango);
    for (var i=0; i<= this.rango; i++) {

      const fact=this.factinicial;
      this.hotRegisterer.getInstance(this.idtalonario).alter('insert_row_below');   //esto crea las columnas que yo quiera
      this.hotRegisterer.getInstance(this.idtalonario).setDataAtCell(i,0,this.factinicial);
      this.hotRegisterer.getInstance(this.idtalonario).setDataAtCell(i,1,this.montodinamico);//aqui pone los datos en la casillas
      //this.datostalonarios.push({monto:this.montodinamico}); 
    }
  
    console.log("aqui estan mi checkbox",this.agregarFilas,0,this.factinicial);
    console.log("aqui estan mi checkbox",this.agregarFilas,1,this.montodinamico);
    
    
    //aqui se tendria  que bloquear la tabla  
  }
}

bloqueartabla(index:number){
  this.hotSettingsArray[index].bloqueada=true;
  
  this.botonBloqueado = true;
  this.habilitarinicio=true;
  this.habilitarfin=true;
}

}
