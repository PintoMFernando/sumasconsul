import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import HyperFormula from 'hyperformula';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { FormularioPrevalorado } from 'src/app/models/tablatalonarioprevalorado.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatrizventasService } from 'src/app/services/matrizventas.service';
import { NuevomesService } from 'src/app/services/nuevomes.service';
import { SumatalonarioService } from 'src/app/services/sumatalonario.service';
import { VentatalonarioService } from 'src/app/services/ventatalonario.service';
import { ChangeDetectorRef } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { VentasMesOperaciones } from 'src/app/models/ventasMesOperaciones.model';
import { HandsonTable } from 'src/app/models/handsontable.model';



@Component({
  selector: 'app-talonariosprevalorados',
  templateUrl: './talonariosprevalorados.component.html',
  styleUrls: ['./talonariosprevalorados.component.css'],
  providers: [ HotTableRegisterer ]
})
export class TalonariosprevaloradosComponent {
  @Input() idmespuntoventasuma: any;  
  @Input() idpuntoventaactividad: any;  
  @Input() nombreactividad: any;  
  @Input()  parametroDelPadreidcentralizadormes: string='';  
  @Input()  indexinterior: any;  
  @Input()  indexexterior: any;  
 @Input() todotalonarios: any;
  
  numberOfFormss: number = 0;
  formArray2: FormGroup[] = [];


  constructor(private formBuilder: FormBuilder,
    
    private hotRegisterer: HotTableRegisterer,
    public ventastalonarioService: VentatalonarioService,
    public sumatalonarioService: SumatalonarioService,
    public messageService: MessageService,
    public dblocal: LocalStorageService,
    public talonarios: NuevomesService,
    private matrizventaService: MatrizventasService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private ventasMesOperaciones: VentasMesOperaciones,
    ) {// this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado = [];  
    }          
   
   numberOfForms: any [] = [];
  
   hotSettingsArray: any[] =[]; //esto contiene todas mis isntancias de handsontable
  
   tablesSettings: Handsontable.GridSettings[] = [];
   suma: number = 0;
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
   intervaloID: any;
   contadorfilas:number =0;
   tipotalonario:number = 2; 
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
   //datosTabla:  ventataalonario = new ventataalonario();
   datosTabla: any[] = [];
   //datosTabla: ventataalonario = new ventataalonario
   conteotalonarios: number =0;
   settingFormula = false;
  idventatalonario: string ="";
  tablatalonariosprevalorados : FormularioPrevalorado = new FormularioPrevalorado(this.hotRegisterer);
  posicionpuntoventa:any;
  tablas: any;
  mistalonarios:any;
    ngOnInit(){
      this.dblocal.SetIdpuntoventaactividad(this.idpuntoventaactividad);
      this.idmespuntoventasuma = String(this.route.snapshot.paramMap.get('idcentralizadormes'));
      this.dblocal.guardarsumasventasPrevaloradaslocalstorage(this.todotalonarios,this.idpuntoventaactividad) 
      this.mistalonarios= this.todotalonarios
      this.traertablasventas();
      // this.iniciarIntervalo();
      this.numberOfForms[this.indexinterior]=this.todotalonarios.length 



      //this.iniciarIntervalo();
      
    }

    
    iniciarIntervalo() {
    
      this.intervaloID =  setInterval(() => {
         //this.pruebaactualizacvion(); 
      }, 15000);
    }
    detenerIntervalo() {
      
      if (this.intervaloID) {
        clearInterval(this.intervaloID);
      }
    }
  
  
    

    async traertablasventas(){     ///para evitar esto podria traer el conteo de talonario directo de la db 

    this.todotalonarios =await this.ventasMesOperaciones.transformarTalonario(this.todotalonarios)
    this.numberOfForms[this.indexinterior]=this.todotalonarios.length  /// con esto contaba los talonarios de mi datos que traia de mi db y le asignaba esa valor a numberofForms 
    await this.actualizarFormularios();
   
   }

  
    async onNumberOfFormsChange() {
      await this.actualizarFormularios();
    }
    async actualizarFormularios() {
      const aumento = this.numberOfForms[this.indexinterior];  
      const catidadTotal = this.mistalonarios.length
   
      if (aumento === catidadTotal) {
        this.mistalonarios= await this.ventasMesOperaciones.transformarTalonario(this.mistalonarios)
      }
        if(aumento> catidadTotal){ //aqui quiere aumentar 
          this.crearFormularios(aumento,catidadTotal);
        
           }
       
    }

  
    async  crearFormularios(cantidad: number,valoaumentar:number) {
      for ( let i = valoaumentar; i < cantidad; i++) {   //aqui itero la cantidad que se aumentare a mis handsontables "valoraumentar " hace eso, creo mis handsontable y los agrego a mi array de handsontable para mostrar  ami vista
        let  talonario = this.ventasMesOperaciones.agregarTalonario(this.idpuntoventaactividad, this.idmespuntoventasuma,2)
        let  handsontable = new HandsonTable(talonario);
       
         
        await  this.mistalonarios.push(handsontable)
        //this.actualizarDatos.emit(this.mistalonarios);  
       }
      // await this.dblocal.guardarsumasventasTodolocalstorage(this.ventastodo);
      // await this.dblocal.guardarsumasventaslocalstorage(this.mistalonarios,this.idpuntoventaactividad)
       await this.guardarDatos();
      this.cdr.detectChanges();
      
    }
 
  
    async guardarDatos(){
      await this.dblocal.guardarsumasventasPrevaloradaslocalstorage(this.mistalonarios,this.idpuntoventaactividad)
     // await this.dblocal.guardarsumasventasTodolocalstorage(this.ventastodo); 
     
      }

   



   
    
      async guardarTalonarioslocalstorage(arrayTalonarios:any){
        await this.dblocal.guardarsumasventasPrevaloradasDBlocalstorage(this.idpuntoventaactividad);
       //await this.dblocal.guardarsumasventaslocalstorage(arrayTalonarios,this.idpuntoventaactividad)
    
     }

     async guardarTalonariosDB(){
      // await this.dblocal.guardarsumasventasDBlocalstorage(this.idpuntoventaactividad);
     }
     anulacionChange(iduuid:string){
      const tabla = this.mistalonarios.find((tabla:any) => tabla.iduuid === iduuid);
      if (tabla) {
        if (tabla.talonarioLogico.agregarFilas) {
          tabla.talonarioLogico.agregarFilas = false;
          const rango = tabla.talonarioLogico.factfinal - tabla.talonarioLogico.factinicial;
    
          for (let i = 0; i <= rango; i++) {
            this.hotRegisterer.getInstance(iduuid).alter('insert_row_below');
            this.hotRegisterer.getInstance(iduuid).setDataAtCell(i, 0, tabla.talonarioLogico.factinicial + i);
            this.hotRegisterer.getInstance(iduuid).setDataAtCell(i, 1, tabla.talonarioLogico.montodinamico);
          }
        }
      }
    
    } 








bloqueartabla(index:number){
this.hotSettingsArray[index].bloqueada=true;

this.botonBloqueado = true;
this.habilitarinicio=true;
this.habilitarfin=true;
}


  
  }
  