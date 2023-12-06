import { HotTableRegisterer } from "@handsontable/angular";
import Handsontable from "handsontable";
import { ContextMenu } from "handsontable/plugins";
import HyperFormula from 'hyperformula';
import { v4 as uuidv4 } from 'uuid';
export class FormularioPrevalorado {



    hyperformulaInstance = HyperFormula.buildEmpty({
        licenseKey: 'internal-use-in-handsontable',
      });

   
    nombreactividad: string = '';
    numtalonario: number = 0;
    factinicial: number = 0;
    factfinal: number = 0;
    agregarFilas: boolean = false;
    montodinamico: number = 0;
    iduuid: string ='';
    suma :number =0;
     hotSettings: Handsontable.GridSettings = {
        
        formulas: {
          engine: this.hyperformulaInstance,       //con esto funciona las formulas
        },
        
        
        data: [
                     
          
        ],
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
            const oldValue = changes[2]
            const row = changes[0];
            const value = changes[3]  //aqui esta el valor de las casillas
            const col =changes[1];
            const factinicial = 1;
            const rowCount = this.hotRegisterer.getInstance(this.iduuid).countRows();
              if (col === 'monto') {
                console.log("este es mi valoooooooooooooooooooooooooooooooor",value);
                //const numero = parseInt(value, 10);
                if (value) {
                    this.hotRegisterer.getInstance(this.iduuid).setDataAtCell(row, 0, this.factinicial + row); //con esto pone automaticamente numeros siempre y cuando ponga fact inicial
                  }


                  if(this.agregarFilas==true){
                    this.agregarFilas=false;
                    const rango = this.factfinal-this.factinicial;
                   
                   for (var i=0; i<= rango; i++) {
                 
                     const fact=this.factinicial;
                     this.hotRegisterer.getInstance(this.iduuid).alter('insert_row_below');   //esto crea las columnas que yo quiera
                     this.hotRegisterer.getInstance(this.iduuid).setDataAtCell(i,0,this.factinicial);
                     this.hotRegisterer.getInstance(this.iduuid).setDataAtCell(i,1,this.montodinamico);//aqui pone los datos en la casillas
                     //this.datostalonarios.push({monto:this.montodinamico}); 
                   }
                 }
             
            
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
    
      
       // colHeaders: ['Nº Factura', 'Monto Bs','SUMA TOTAL'], //aqui se coloca lo nombres de columnas
       colHeaders: ['numfactura', 'monto','Total'],  
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
        ],
        hiddenColumns: {
            columns: [2], // Esto oculta las columnas 
        }, 

        licenseKey: 'non-commercial-and-evaluation'
        
      };
   
    // Agrega más propiedades según sea necesario
  
  
 









  constructor(
    private hotRegisterer: HotTableRegisterer,
   )
   {   this.iduuid = FormularioPrevalorado.generateUUID();   
    
}
private static generateUUID(): string {
    // Implementa tu lógica para generar UUID aquí
    // Puedes usar la biblioteca uuidv4 o implementar tu propia lógica
    return uuidv4();
}

anulacionChange(){
   
    if(this.agregarFilas==true){
    this.agregarFilas=false;
    const rango = this.factfinal-this.factinicial;
   
   for (var i=0; i<= rango; i++) {
 
     const fact=this.factinicial;
     this.hotRegisterer.getInstance(this.iduuid).alter('insert_row_below');   //esto crea las columnas que yo quiera
     this.hotRegisterer.getInstance(this.iduuid).setDataAtCell(i,0,this.factinicial);
     this.hotRegisterer.getInstance(this.iduuid).setDataAtCell(i,1,this.montodinamico);//aqui pone los datos en la casillas
     //this.datostalonarios.push({monto:this.montodinamico}); 
   }
 
 
   
   
   //aqui se tendria  que bloquear la tabla  
 
 }
 } 

}
