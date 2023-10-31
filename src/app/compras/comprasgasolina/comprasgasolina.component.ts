import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import HyperFormula from 'hyperformula';
import { HotTableRegisterer } from '@handsontable/angular';



@Component({
  selector: 'app-comprasgasolina',
  templateUrl: './comprasgasolina.component.html',
  styleUrls: ['./comprasgasolina.component.css'],
  providers: [ HotTableRegisterer ]
})
export class ComprasgasolinaComponent {

  @Input() parametroDelPadreidcentralizadormes: string='';
  constructor(private formBuilder: FormBuilder,
    
    private hotRegisterer2: HotTableRegisterer,
    ) { }  
    
    idtalonario = 'hotInstance';
    hotSettingsArray: any[] =[]; 
    bloqeuarboton:boolean =false;
    jsonComprassArray:any = [];
    
  
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
         // ['', '=SUM(A:A)'],               
          
        ],
       
        afterChange : (changes,source) =>{
        if (changes || source === 'edit') {
          //console.log("Changes:", changes[3]);
          changes!.forEach((changes, index, array) => {
            const oldValue = changes[2]
            const row = changes[0];
            const value = changes[3]  //aqui esta el valor de las casillas
            const col =changes[1];
            const rowCount = this.hotRegisterer2.getInstance('tabla2').countRows();

           
              if (col === 'Monto Bs') {
                console.log("entra al col",col);
                //const numero = parseInt(value, 10);
                
                
            switch (value) {
              case 'I':
              case 'i':
                this.hotRegisterer2.getInstance('tabla2').setCellMeta(changes[0], 1, 'className', 'colornegro');//esto cambia el color de la celda
                break;
              case 'A': 
              case 'a':
                this.hotRegisterer2.getInstance('tabla2').setCellMeta(changes[0], 1, 'className', 'colorrojo');
                break;
              case 'E':
              case 'e':
                this.hotRegisterer2.getInstance('tabla2').setCellMeta(changes[0], 1, 'className', 'colorazul');
                break;
              default:
                this.hotRegisterer2.getInstance('tabla2').setCellMeta(changes[0], 1, 'className', 'colorblanco');
                break;
            }
            this.hotRegisterer2.getInstance('tabla2').render(); 
            
          }
            
          })
          
        }
        
         // return true
      },  
    
      
        colHeaders: ['Monto Bs','TOTAL'], //aqui se coloca lo nombres de columnas
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
          {
            data: 'Monto Bs',
          },
          {
            data: 'TOTAL',
            readOnly: true,
            className: 'bg-read-only',  
          },
        ], 
        licenseKey: 'non-commercial-and-evaluation'
        
      };
    
      //hotSettings['id'] = tableId;
      this.hotSettingsArray.push(hotSettings);
      console.log("aqui esta mi array de tablas", this.hotSettingsArray);
      console.log("aqui esta el id de cada tabla",'tabla2' );
     // this.hotRegisterer2.getInstance('tabla2').getData();
      
    };
    
    
    guardar(){
      this.bloqeuarboton= true;
      var readOnly= this.hotRegisterer2.getInstance('tabla2').getSettings().readOnly;
       this.hotRegisterer2.getInstance('tabla2').updateSettings({                         //esto bloquea la tabla
        readOnly: !readOnly
      });

      console.log("HOLSO ES EL DATA de gasolina",  this.hotRegisterer2.getInstance('tabla2').getData());
      
      const matrizdata =this.hotRegisterer2.getInstance('tabla2').getData()
      for (const fila of matrizdata) {
        if (fila[0] !== null ) {
          const jsondatagasolina ={
            monto: fila[0],
            total:fila[1],
          }
          this.jsonComprassArray.push(jsondatagasolina)
        }
      
    }
    console.log("holos es el json de gasolina",this.jsonComprassArray);
     
  }

}
