import { HotTableRegisterer } from "@handsontable/angular";
import Handsontable from "handsontable";
import { ContextMenu } from "handsontable/plugins";
import HyperFormula from 'hyperformula';

export class Formulario {
    hyperformulaInstance = HyperFormula.buildEmpty({
        licenseKey: 'internal-use-in-handsontable',
      });

    nombreactividad: string = '';
    numtalonario: number = 0;
    factinicial: number = 0;
    factfinal: number = 0;
    agregarFilas: boolean = false;
    montodinamico: string = '';
   // hotSettings: any;
   
    hotSettings: Handsontable.GridSettings = {
        formulas: {
          engine: this.hyperformulaInstance,       //con esto funciona las formulas
        },
        
        data: [
                     
          
        ],
        afterFormulasValuesUpdate : (changes) => { //contiene el valor de la celda de las sumas
      
          const suma = this.hotRegisterer.getInstance('talonario').getDataAtCell(0,2 );
         
        
        
        
        
      },
       
        afterChange : (changes,source) =>{
            let settingFormula = false;
          if (!settingFormula) {
            settingFormula = true;
            this.hotRegisterer.getInstance('talonario').setDataAtCell(0, 2, '=SUM(B:B)');
            settingFormula = false;
          }
            
          

        //  this.hotRegisterer.getInstance('tabla3').setDataAtCell(0, 2, '=SUM(B:B)');

        if (changes || source === 'edit') {
          //console.log("Changes:", changes[3]);
          changes!.forEach((changes, index, array) => {
            const oldValue = changes[2]
            const row = changes[0];
            const value = changes[3]  //aqui esta el valor de las casillas
            const col =changes[1];
            const factinicial = 1;
            const rowCount = this.hotRegisterer.getInstance('talonario').countRows();
            
              if (col === 'monto') {
               // console.log("entra al col",col);
                //const numero = parseInt(value, 10);
                if (value) {
                 
                    this.hotRegisterer.getInstance('talonario').setDataAtCell(row, 0, factinicial + row); //con esto pone automaticamente numeros siempre y cuando ponga fact inicial
                
                  
                  }
             
            
            switch (value) {
              case 'I':
              case 'i':
                this.hotRegisterer.getInstance('talonario').setCellMeta(changes[0], 1, 'className', 'colornegro');//esto cambia el color de la celda
                break;
              case 'A': 
              case 'a':
                this.hotRegisterer.getInstance('talonario').setCellMeta(changes[0], 1, 'className', 'colorrojo');
                break;
              case 'E':
              case 'e':
                this.hotRegisterer.getInstance('talonario').setCellMeta(changes[0], 1, 'className', 'colorazul');
                break;
              default:
                this.hotRegisterer.getInstance('talonario').setCellMeta(changes[0], 1, 'className', 'colorblanco');
                break;
            }
            this.hotRegisterer.getInstance('talonario').render(); 
            
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

        licenseKey: 'non-commercial-and-evaluation'
        
      };
   
    // Agrega más propiedades según sea necesario
  
  
 









  constructor(
    private hotRegisterer: HotTableRegisterer,
   )
   {       }
}
