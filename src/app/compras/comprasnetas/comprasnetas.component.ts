import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import HyperFormula from 'hyperformula';
import { ComprassumasService } from 'src/app/services/comprassumas.service';
import { ComprassumasdetalleService } from 'src/app/services/comprassumasdetalle.service';

@Component({
  selector: 'app-comprasnetas',
  templateUrl: './comprasnetas.component.html',
  styleUrls: ['./comprasnetas.component.css'],
  providers: [ HotTableRegisterer ]
})
export class ComprasnetasComponent {

  @Input() parametroDelPadreidcentralizadormes: string='';
  constructor(
          private formBuilder: FormBuilder,
          private hotRegisterer1: HotTableRegisterer,
         private comprasumadetalleService: ComprassumasdetalleService,
         public mesconcomprasumasservice: ComprassumasService,
        
    ) { }  
    
    idtalonario2 = 'hotInstance';
    hotSettingsArray1: any[] =[]; 
    bloqeuarboton:boolean =false;
    jsonComprasnetassArray:any = [];
    intervaloID: any;
    idcomprasuma: string =""; 
    valorsuma: number =0; 
    
  //PRUEBA Handsontable, DA
  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });

  ngOnInit(){
    this.crearmitabla();
    this.iniciarIntervalo();
    //this.traerdatos();//en este caso y ano es necesario traer datos sino hacer solo guaradr los datos cada tanto
   
  }
  ngOnDestroy() {
    // Detén el intervalo cuando el componente se destruye para evitar fugas de memoria
    this.detenerIntervalo();
  }

  iniciarIntervalo() {
    this.intervaloID = setInterval(() => {
      this.guardar(); 
    }, 5000);
  }


  detenerIntervalo() {
    // Detén el intervalo utilizando el ID del intervalo almacenado
    if (this.intervaloID) {
      clearInterval(this.intervaloID);
    }
  }
 

  crearmitabla(){
    
 
      const hotSettings: Handsontable.GridSettings = {
        formulas: {
          engine: this.hyperformulaInstance,       //con esto funciona las formulas
        },
        
        data: [
          ['','', '=SUM(A:A)-SUM(B:B)'],               
          
        ],
       
        afterChange : (changes,source) =>{
        if (changes || source === 'edit') {
          //console.log("Changes:", changes[3]);
          changes!.forEach((changes, index, array) => {
            const oldValue = changes[2]
            const row = changes[0];
            const value = changes[3]  //aqui esta el valor de las casillas
            const col =changes[1];
            const rowCount = this.hotRegisterer1.getInstance('tabla1').countRows();

           
              if (col === 'Monto Bs') {
                console.log("entra al col",col);
                //const numero = parseInt(value, 10);
                
                
            switch (value) {
              case 'I':
              case 'i':
                this.hotRegisterer1.getInstance('tabla1').setCellMeta(changes[0], 1, 'className', 'colornegro');//esto cambia el color de la celda
                break;
              case 'A': 
              case 'a':
                this.hotRegisterer1.getInstance('tabla1').setCellMeta(changes[0], 1, 'className', 'colorrojo');
                break;
              case 'E':
              case 'e':
                this.hotRegisterer1.getInstance('tabla1').setCellMeta(changes[0], 1, 'className', 'colorazul');
                break;
              default:
                this.hotRegisterer1.getInstance('tabla1').setCellMeta(changes[0], 1, 'className', 'colorblanco');
                break;
            }
            this.hotRegisterer1.getInstance('tabla1').render(); 
            
          }
            
          })
          
        }
        
         // return true
      },  
      
    
      
        colHeaders: ['Monto Bs', 'Descuento','TOTAL'], //aqui se coloca lo nombres de columnas
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
               //esto bloquea la celda para que solo sea de lectura

          },
          {
            data: 'Descuento',
          
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
      this.hotSettingsArray1.push(hotSettings);
      console.log("aqui esta mi array de tablas", this.hotSettingsArray1);
      console.log("aqui esta el id de cada tabla",'tabla1' );
     // this.hotRegisterer.getInstance('tabla1').getData();
      
    };
    
    
    async guardar(){
     /* this.bloqeuarboton= true;
      var readOnly= this.hotRegisterer1.getInstance('tabla1').getSettings().readOnly;
       this.hotRegisterer1.getInstance('tabla1').updateSettings({                         //esto bloquea la tabla
        readOnly: !readOnly
      });
      */
      console.log("HOLSO ES EL DATA de compras netas",  this.hotRegisterer1.getInstance('tabla1').getData());
      
      const matrizdata =this.hotRegisterer1.getInstance('tabla1').getData()
      for (const fila of matrizdata) {
        if (fila[0] !== null ) {
          const jsondatacomprasnetas ={
          monto: fila[0],
          descuento:fila[1],
          total:fila[2],
          }
          this.jsonComprasnetassArray.push(jsondatacomprasnetas)
          
        }
        
       
    }
    //await this.comprasumadetalleService.patchComprasumadetalles(this.parametroDelPadreidcentralizadormes,this.jsonComprasnetassArray);  
    console.log("holos es el json de compras netas",this.jsonComprasnetassArray);
    this.traerdatos();
      
    }

    async traerdatos(){
      
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaR", this.parametroDelPadreidcentralizadormes); //CON ESTO P[UEDO TRAER LOS DATOS PARA PONER EN LA TABLA SUMASDETALLE
      await this.mesconcomprasumasservice.getComprassumas(this.parametroDelPadreidcentralizadormes)
      .subscribe(
        (data: any) => {
          console.log("aqui esta le data", data)
          this.idcomprasuma=data[0].comprassumas.idcomprasuma;
          //if(this.)

          
          ///console.log("AQUI ESTA MI IDE DE COMRPASSUMAS",this.idcomprasuma);
        } 
             
       );

      }

 

  
   
}
   
   

  

