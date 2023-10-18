import { AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
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
  ultimoNumeroIngresado: number = 0;
  ultimoValorInputFinal: number = 0;
  inputFinal: number = 0;
  inputInicial: number = 0; 
  valorsuma: any;
  valorcasillas:any;
  datostalonarios:any = [];
   talonario={};
   botonPresionado: boolean = false;
  factinicial: number=0;
  factfinal: number=0;
   id = 'hotInstance';
   agregarFilas: boolean = false;
  rango: number=0;
  montodinamico: number=0;
 

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
      ['','', '=SUM(B:B)'],               
      
    ],

    
    
    afterChange : (changes,source) =>{
      console.log("Changes:", changes);
      
      
    if (changes) {
      //console.log("Changes:", changes[3]);
      changes.forEach((changes, index, array) => {
        const oldValue = changes[2]
        const value = changes[3]  //aqui esta el valor de las casillas
        console.log("aqui se encuentra el valor de la casilla",value);
        console.log("aqui esta todo el valor de changes",changes);
         this.datostalonarios.push(value); //aqui se guarda los  valores de las sumas
         
        switch (value.toUpperCase()) {
          case 'I'||'i':
            this.hotRegisterer.getInstance(this.id).setCellMeta(changes[0], 1, 'className', 'colornegro');//esto cambia el color de la celda
            this.hotRegisterer.getInstance(this.id).render(); 
            break;
          case 'A' || 'a':
            this.hotRegisterer.getInstance(this.id).setCellMeta(changes[0], 1, 'className', 'colorrojo');
          this.hotRegisterer.getInstance(this.id).render(); 
            break;
          case 'E'||'e':
            this.hotRegisterer.getInstance(this.id).setCellMeta(changes[0], 1, 'className', 'colorazul');
          this.hotRegisterer.getInstance(this.id).render(); 
            break;
          default:
            this.hotRegisterer.getInstance(this.id).setCellMeta(changes[0], 1, 'className', 'colorblanco');
            this.hotRegisterer.getInstance(this.id).render(); 
            break;
        }
        
        if(value== 20 ){
          this.hotRegisterer.getInstance(this.id).setCellMeta(changes[0], 1, 'className', 'colorblanco');
          this.hotRegisterer.getInstance(this.id).render(); 
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
        readOnly: false,    //esto bloquea la celda para que solo sea de lectura
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


  guardarDatos(){
    console.log("aqui estan los datos",this.datostalonarios);
    console.log("aqui esta la suma", this.valorsuma);
    this.talonario={
         monto:this.datostalonarios,
         total:this.valorsuma
    }
    this.datostalonarios=[];
    this.valorsuma={};
    console.log("estos son todos los datos de talonarioa",this.talonario); //aqui esta todos mi datos
  }

  anulacionChange(){
     //nos quedamos aqui
    
    
     if(this.agregarFilas==true){
     this.agregarFilas=false;
     this.rango = this.factfinal-this.factinicial;
     console.log("aqui estan mi rango",this.rango);
    for (var i=0; i<= this.rango; i++) {

      const fact=this.factinicial;
      this.hotRegisterer.getInstance(this.id).alter('insert_row_below');   //esto crea las columnas que yo quiera
      this.hotRegisterer.getInstance(this.id).setDataAtCell(i,0,this.factinicial++);
      this.hotRegisterer.getInstance(this.id).setDataAtCell(i,1,this.montodinamico);//aqui pone los datos en la casillas
    }

    console.log("aqui estan mi checkbox",this.agregarFilas,0,this.factinicial);
    console.log("aqui estan mi checkbox",this.agregarFilas,1,this.montodinamico);
    this.rango=0
    this.factfinal=0;
    this.factinicial=0;
    this.montodinamico=0;

    const hotInstance = this.hotRegisterer.getInstance(this.id);
    const hotData = hotInstance.getSourceData();
    //this.hotRegisterer.getInstance(this.id).loadData(hotData);
    console.log("aqui estan mi DATA",hotData);
    
  }
}
}
