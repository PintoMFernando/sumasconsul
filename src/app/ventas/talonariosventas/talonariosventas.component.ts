import {  ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output, ViewChild} from '@angular/core';
import { NuevomesService } from 'src/app/services/nuevomes.service';
import { HotTableRegisterer } from '@handsontable/angular';
import { MessageService } from 'primeng/api';
import { VentatalonarioService } from 'src/app/services/ventatalonario.service';
import { SumatalonarioService } from 'src/app/services/sumatalonario.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { VentasMesOperaciones } from 'src/app/models/ventasMesOperaciones.model';
import { ActivatedRoute } from '@angular/router';
import { HandsonTable } from 'src/app/models/handsontable.model';
import { sumatalonario } from 'src/app/models/sumatalonario';
import { MatrizventasService } from 'src/app/services/matrizventas.service';
import { Subscription } from 'rxjs';
import Handsontable from 'handsontable';
import { PuntoactividadService } from 'src/app/services/puntoactividad.service';
import { TipoTalonario } from 'src/app/models/tipoTalonarioEnum';


@Component({
  selector: 'app-talonariosventas',
  templateUrl: './talonariosventas.component.html',
  styleUrls: ['./talonariosventas.component.css'],
  providers: [ HotTableRegisterer ]
})
export class TalonariosventasComponent   {
  @Input()  indexinterior: any;  
  @Input()  indexexterior: any; 
  @Input() actividad:any;
  //@Input() idmespuntoventasuma: any;  
  @Input() idpuntoventaactividad: any;  
  @Input() nombreactividad: any;  
  @Input()  parametroDelPadreidcentralizadormes: string='';  
  @Input() todotalonarios: any;

  @ViewChild('tabla') tabla!: HandsonTable;
  @Output() actualizarDatos = new EventEmitter<any[]>(); //era un intento de guardar mis datos en mi variable padre por cada cambio 
  private ventasMesOperaciones: VentasMesOperaciones;

  constructor(
              public talonarios: NuevomesService, 
              public hotRegisterer: HotTableRegisterer,
              public ventastalonarioService: VentatalonarioService,
              public sumatalonarioService: SumatalonarioService,
              public messageService: MessageService,
              public dblocal: LocalStorageService,
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute,
              private comunicacionService: MatrizventasService,
              private idpuntoventaactrividad: PuntoactividadService,
             )
             {    

               this.ventasMesOperaciones = VentasMesOperaciones.getInstance();
               console.log("construccccccccccccc",VentasMesOperaciones.getInstance())
              
                // Realiza las acciones que necesites con los datos recibidos, como obtener el ID
            
            
              }
     datosRecibidos: any;         
  logicaEjecutada = false;

  numberOfForms: any [] = [];
 
  misencabezados: any[] =[]; //esto contiene todas mis isntancias de handsontable
 
  botonBloqueado: boolean = false;
  habilitarinicio:boolean=false;
  habilitarfin:boolean=false;
 

  intervaloID: any;
  idmespuntoventasuma: string ="";
  //ventastodo:any;
  mistalonarios:any;

  cambiosSubscription:any;
  changedData: any;
  numTalonario:number=0;

  ngAfterViewInit() {
    console.log("ENTRAAAAAA YO SE QUE SI ERA ")
   /* this.hotRegisterer.getInstance("9235c09b-f5a0-4df2-9047-028af7abaea0").addHook('afterChange', (changes, source) => {
      if (source !== 'loadData') {
        // Aquí puedes acceder a los cambios en las celdas
        console.log('Cambios en las celdas:', changes);
      }
    });*/
  }

  ngOnInit(){
  
   
    
    this.idpuntoventaactrividad.SetIdpuntoventaactividad(this.idpuntoventaactividad);
    this.dblocal.guardarsumasventaslocalstorage(this.todotalonarios,this.idpuntoventaactividad) //guardamos nuestro array de talonarios
    this.idmespuntoventasuma = String(this.route.snapshot.paramMap.get('idcentralizadormes'));
    this.mistalonarios= this.todotalonarios
    this.traertablasventas();
     this.iniciarIntervalo();
    this.numberOfForms[this.indexinterior]=this.todotalonarios.length 
   
  }
  @HostListener('window:popstate', ['$event']) //para caundo se vaya atras
  async onPopState(event: any) {
    //await this.guardarDatos();
    //await this.guardarTalonariosDB();
  }

  /* @HostListener('window:beforeunload', ['$event']) //para cuando cierre el navegador
   async onBeforeUnload(event: any) {
    await this.guardarDatos();
    await this.guardarTalonariosDB();
  }*/
 

  ngOnDestroy() {
    this.detenerIntervalo();
  }

   iniciarIntervalo() {
    
    this.intervaloID =  setInterval(() => {
       //this.guardarDatos();
     //  this.prueba(); 
    }, 15000);
  }
  detenerIntervalo() {
    
    if (this.intervaloID) {
      clearInterval(this.intervaloID);
    }
  }


  async traertablasventas(){
   // this.todotalonarios =await this.ventasMesOperaciones.transformarTalonario(this.todotalonarios)
   // this.numberOfForms[this.indexinterior]=this.todotalonarios.length  /// con esto contaba los talonarios de mi datos que traia de mi db y le asignaba esa valor a numberofForms 
   // await this.actualizarFormularios();
   }


  async onNumberOfFormsChange() {
    console.log("actividaddddddddd     ",this.actividad)
    console.log("toooooooooooooo ",this.ventasMesOperaciones.getPuntoVentas())
    console.log("***************************",this.ventasMesOperaciones.getPuntoVentaFromActividad(this.actividad))
    //console.log("-**--------***-*-**-*-",this.ventasMesOperaciones.getPuntoVentas().puntoventaactividads.indexOf(this.actividad));
    const aumento = this.numberOfForms[this.indexinterior];  
    const catidadTotal = this.mistalonarios.length
    if (aumento === catidadTotal) {
     // this.mistalonarios= await this.ventasMesOperaciones.transformarTalonario(this.mistalonarios) //AQUI CREAR PARA castear
    }
    if(aumento> catidadTotal){ //aqui quiere aumentar 
     this.ventasMesOperaciones.agregarTalonario(this.actividad,this.idmespuntoventasuma,TipoTalonario.Normal); //aqui agrega talonairo
    
       }
       else{//supongo que quiere reducir 
        if(this.mistalonarios.length!== 0){
        const ultimodato =this.mistalonarios.length-1; 
          if(this.mistalonarios[ultimodato].hotSettings.data.length === 2){//el tamanio de mi array siempre sera 2  this.mistalonarios[ultimodato].talonarioLogico.sumatalonarios.length === 2
            this.actividad.ventatalonariostipo1.pop();
          }
          else{
            this.numberOfForms[this.indexinterior]= //no dejar que el numero aumente y se quede tieso para que no arruine lo que quiero hacer 
            this.messageService.add({ severity: 'error', summary: 'CUIDADO ', detail: 'No se puede Quitar el Talonairo por que Hay datos en el ' });
          }
        }
            
       }

   
    
    this.mistalonarios= this.actividad.ventatalonariostipo1; //esto solo es para mostrar 
    
    
    
    
    
    
    console.log("actividaddddddddd 22222    ",this.actividad)
    console.log("toooooooooooooo revisar datos",this.ventasMesOperaciones.getPuntoVentas())
    console.log("mis T  alonarios xdxdxd", this.mistalonarios)
    //await this.actualizarFormularios();
  }

 
//no sirve
  async actualizarFormularios() {
    const aumento = this.numberOfForms[this.indexinterior];  
    const catidadTotal = this.mistalonarios.length
 
    if (aumento === catidadTotal) {
      this.mistalonarios= await this.ventasMesOperaciones.transformarTalonario(this.mistalonarios)
    }
      if(aumento> catidadTotal){ //aqui quiere aumentar 
        this.crearFormularios(aumento,catidadTotal);
      
         }
         else{//supongo que quiere reducir 
          if(this.mistalonarios.length!== 0){
          const ultimodato =this.mistalonarios.length-1; 
            if(this.mistalonarios[ultimodato].hotSettings.data.length === 2){//el tamanio de mi array siempre sera 2  this.mistalonarios[ultimodato].talonarioLogico.sumatalonarios.length === 2
              this.mistalonarios.pop();
            }
            else{
              this.numberOfForms[this.indexinterior]= //no dejar que el numero aumente y se quede tieso para que no arruine lo que quiero hacer 
              this.messageService.add({ severity: 'error', summary: 'CUIDADO ', detail: 'No se puede Quitar el Talonairo por que Hay datos en el ' });
            }
          }
              
         }
  
  }
  //nosirve 
  async crearFormularios(cantidad: number,valoaumentar:number) {
    
    for ( let i = valoaumentar; i < cantidad; i++) {   //aqui itero la cantidad que se aumentare a mis handsontables "valoraumentar " hace eso, creo mis handsontable y los agrego a mi array de handsontable para mostrar  ami vista
     let  talonario = this.ventasMesOperaciones.agregarTalonario(this.idpuntoventaactividad, this.idmespuntoventasuma,1)
     let  handsontable = new HandsonTable(talonario);
    
     console.log("AQUI TENDIR AUE ESTAR MI NUEVO??????", handsontable) 
     await  this.mistalonarios.push(handsontable)
    // this.actualizarDatos.emit(this.mistalonarios);  //esto ya me lo tiene todo 
    }
   // await this.dblocal.guardarsumasventasTodolocalstorage(this.ventastodo);
   // await this.dblocal.guardarsumasventaslocalstorage(this.mistalonarios,this.idpuntoventaactividad)
    await this.guardarDatos();
  }

 async guardarDatos(){
  await this.dblocal.guardarsumasventaslocalstorage(this.mistalonarios,this.idpuntoventaactividad)
 // await this.dblocal.guardarsumasventasTodolocalstorage(this.ventastodo); 
 
  }

  async guardarTalonarioslocalstorage(arrayTalonarios:any){
    await this.dblocal.guardarsumasventasDBlocalstorage(this.idpuntoventaactividad);
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

manejarCambios(datos: any) {
  console.log('Cambios recibidos en el componentesssssss343434343434:', datos);
}


bloqueartabla(index:number){
 
  
  this.botonBloqueado = true;
  this.habilitarinicio=true;
  this.habilitarfin=true;
}


prueba(){
  
  this.actualizarDatos.emit(this.mistalonarios);  
  
  
}

recuperarId(){
     console.log("ENTRA LOCURASASASASASASASAS")
     this.cdr.detectChanges();
}





}