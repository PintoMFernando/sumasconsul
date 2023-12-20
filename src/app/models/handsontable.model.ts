import { HotTableRegisterer } from "@handsontable/angular";
import Handsontable from "handsontable";
import { ContextMenu } from "handsontable/plugins";
import HyperFormula from 'hyperformula';
import { v4 as uuidv4 } from 'uuid';
import { VentasMesOperaciones } from "./ventasMesOperaciones.model";
import { TalonarioLogico } from "./tablatalonariologico.model";
import { sumatalonario } from "./sumatalonario";
import { MatrizventasService } from "../services/matrizventas.service";
import { EventEmitter } from "@angular/core";


export class HandsonTable {
  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });

  talonarioLogico:TalonarioLogico = new TalonarioLogico();
  public hotRegisterer: HotTableRegisterer;
  
  
 
  iduuid: string =this.generateUUID();
  suma: number =0;
  hotSettings: Handsontable.GridSettings = {
        
    formulas: {
      engine: this.hyperformulaInstance,       //con esto funciona las formulas
    },
    
    
    data: [

    ],
    maxRows:50,
    afterFormulasValuesUpdate : (changes) => { //contiene el valor de la celda de las sumas
      
       this.suma = this.hotRegisterer.getInstance(this.iduuid).getDataAtCell(0,2 );
     
  
  },
   
    afterChange : (changes,source) =>{
 //       let settingFormula = true;
    if (source === 'loadData') {
        // Configurar la fórmula después de cargar los datos
        this.hotRegisterer.getInstance(this.iduuid).setDataAtCell(0, 2, '=SUM(B:B)');
      }
    
    if (changes || source === 'edit') {
      //console.log("Changes:", changes[3]);
      changes!.forEach((changes, index, array) => {
        console.log("aqui estan los cambios de las celdaaaaaaaaaaaaaas", changes)
        const oldValue = changes[2] //viejo valor
        const row = changes[0]; //numero de fila
        const value = changes[3]  //nuevo valor
        const col =changes[1];
        const idsumatalonario = uuidv4();
        const estado = 1;
        const rowCount = this.hotRegisterer.getInstance(this.iduuid).countRows();
     
        
          if (col === 'monto') { //si hay nuevo monto
           
            
            
            console.log("este es mi valoooooooooooooooooooooooooooooooor",value, "Y este mi id de mi tabla",this.iduuid,"y mi numeo de factura",row,this.talonarioLogico.idventatalonario);
            
            if(typeof oldValue === 'undefined'){  //crea datos
              this.nuevoDatosHandson(idsumatalonario,row,value,this.talonarioLogico.idventatalonario!);
             
            }
            else{ //actualiza datos 
              
              console.log("aentra changeeeeeeeas", changes)
              const datosFilaActualizar = this.hotRegisterer.getInstance(this.iduuid).getSourceDataAtRow(changes[0]);
              console.log("entraaa",datosFilaActualizar)
              this.actualizarDatosHandson(datosFilaActualizar)
            }

            if (value) {
                this.hotRegisterer.getInstance(this.iduuid).setDataAtCell(row, 0, this.talonarioLogico.factinicial + row); //con esto pone automaticamente numeros siempre y cuando ponga fact inicial
                this.hotRegisterer.getInstance(this.iduuid).setDataAtCell(row, 3, idsumatalonario );
                this.hotRegisterer.getInstance(this.iduuid).setDataAtCell(row, 4, this.talonarioLogico.idventatalonario );
                this.hotRegisterer.getInstance(this.iduuid).setDataAtCell(row, 5, estado );
                
              }

              if (value === '' || value === null) {
                
                this.hotRegisterer.getInstance(this.iduuid).alter('remove_row', row); //esto remueve la celdaaaa
                

              }
             
            // this.talonarioLogico.factfinal=
           
         
        
        switch (value) {
          case 'I':
          case 'i':
            this.hotRegisterer.getInstance(this.iduuid).setCellMeta(changes[0], 1, 'className', 'colornegro');//esto cambia el color de la celda
            break;
          case 'A': 
          case 'a':
            this.hotRegisterer.getInstance(this.iduuid).setCellMeta(changes[0], 1, 'className', 'colorrojo');
            break;
          case 'E':
          case 'e':
            this.hotRegisterer.getInstance(this.iduuid).setCellMeta(changes[0], 1, 'className', 'colorazul');
            break;
          default:
            this.hotRegisterer.getInstance(this.iduuid).setCellMeta(changes[0], 1, 'className', 'colorblanco');
            break;
        }
        this.hotRegisterer.getInstance(this.iduuid).render(); 
        
      }
        
      })
      
    }
    
     // return true
  },  
  
  beforeRemoveRow:(index, amount, logicalRows, physicalRows)=>{ //pendiente...
    const columnaDeseada = 1;
    const datosFila = this.hotRegisterer.getInstance(this.iduuid).getDataAtRow(index);
    console.log("mis datoooooooooooooos2222222222222222",datosFila)
    console.log( "que es physicalRows", physicalRows)
    var idsumatalonario = datosFila[3];
    var idventatalonario = datosFila[4];
    console.log("mis datoooooooooooooos",idsumatalonario)
    
   // console.log("mis datos",datosFila)
    this.eliminarDatosHandson(idsumatalonario,idventatalonario);
  },
  /*afterRemoveRow: (index, amount, logicalRows, physicalRows) => {
    // 'amount' indica la cantidad de filas eliminadas
  
    console.log("QUE ES INDEX",index,"QUE ES AMOUNT????????",amount, "que es logicalRows",logicalRows, "que es physicalRows", physicalRows)
  
    // Puedes realizar acciones adicionales después de la eliminación
    // por ejemplo, actualizar otros elementos de tu interfaz o realizar otras tareas
  },*/

  
   // colHeaders: ['Nº Factura', 'Monto Bs','SUMA TOTAL'], //aqui se coloca lo nombres de columnas
   colHeaders: ['numfactura', 'monto','Total','idsumatalonario','idventatalonario','estado'],  
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
        data: 'numfactura',
        //readOnly: false,    //esto bloquea la celda para que solo sea de lectura
        //editor: false,
        type: 'numeric',
      },
      {
        data: 'monto',
        
      },
      {
        data: 'SUMA TOTAL',
        readOnly: true,
        className: 'bg-read-only',  
      },
      {
        data: 'idsumatalonario',
        readOnly: true,  
      },
      {
        data: 'idventatalonario',
        readOnly: true,  
      },
      {
        data: 'estado',
        readOnly: true,  
      },
    ],
    hiddenColumns: {
        columns: [2,3,4,5], // Esto oculta las columnas 
    }, 

    licenseKey: 'non-commercial-and-evaluation'
    
  };


  constructor( talonario:any)
   { 
    this.talonarioLogico=talonario
    console.log("taloloooonario //*/*/*/",this.talonarioLogico)
    this.hotRegisterer = new HotTableRegisterer()
    this.ventasMesOperaciones = VentasMesOperaciones.getInstance();
    //this.iduuid = this.generateUUID();   
    }
 generateUUID(){
    
  const uuid= uuidv4();
  console.log("midsumatalonario",uuid)
    return uuid;
}
private ventasMesOperaciones: VentasMesOperaciones;

async nuevoDatosHandson(id:string,numfact:number,value:number,idventatalonario:string){
  await this.ventasMesOperaciones.agregarValorTalonario(id,numfact,value,idventatalonario);
}

async eliminarDatosHandson(idsumatalonario:any,idventatalonario:any){
  
  await this.ventasMesOperaciones.deleteValorTalonario(idsumatalonario,idventatalonario);
}

async actualizarDatosHandson(filaActualizar:any){
  
  await this.ventasMesOperaciones.updateValorTalonario(filaActualizar);
}



}
