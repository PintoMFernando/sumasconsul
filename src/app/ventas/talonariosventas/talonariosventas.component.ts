import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, SimpleChanges, ViewChild} from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
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
import { ventataalonario } from 'src/app/models/ventatalonario';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatrizventasService } from 'src/app/services/matrizventas.service';
import { interval, Subscription } from 'rxjs';
import { Formulario } from 'src/app/models/tablatalonario.model';
//import { TalonarioLogico,crearNuevoTalonario  } from 'src/app/models/tablatalonariologico.model';
import { VentasMesOperaciones } from 'src/app/models/ventasMesOperaciones.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-talonariosventas',
  templateUrl: './talonariosventas.component.html',
  styleUrls: ['./talonariosventas.component.css'],
  providers: [ HotTableRegisterer ]
})
export class TalonariosventasComponent   {
  @Input()  indexinterior: any;  
  @Input()  indexexterior: any; 
  //@Input() idmespuntoventasuma: any;  
  @Input() idpuntoventaactividad: any;  
  @Input() nombreactividad: any;  
  @Input()  parametroDelPadreidcentralizadormes: string='';  
  @Input() todotalonarios: any;

 


  valorCelda: any; 

 
  
  constructor(private formBuilder: FormBuilder,
              public talonarios: NuevomesService, 
              public hotRegisterer: HotTableRegisterer,
              public ventastalonarioService: VentatalonarioService,
              public sumatalonarioService: SumatalonarioService,
              public messageService: MessageService,
              public dbLocal: LocalStorageService,
              private matrizventaService: MatrizventasService,
              private cdr: ChangeDetectorRef,
              private ventasMesOperaciones: VentasMesOperaciones,
              private route: ActivatedRoute,
             
             )
             { this.matrizventaService.matrizLocalstorage = [];
              this.matrizventaService.matrizLocalstorageidventatalonario = [];
             // this.ventasMesOperaciones.datosTabla = [];          
              }
              
  logicaEjecutada = false;
  //numberOfForms: number = 0;
  tabla: ventataalonario = new ventataalonario;
  tablatalonarios : Formulario = new Formulario(this.hotRegisterer);
  contadorNgOnInit:number=0;
  numberOfForms: any [] = [];
  formArray: FormGroup[] = [];
  hotSettingsArray: any[] =[]; //esto contiene todas mis isntancias de handsontable
  hotSettingsArray2: any[] =[];
  misencabezados: any[] =[]; //esto contiene todas mis isntancias de handsontable
  hotDataArray =[];
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
  
  factinicial: any[]=[];
  factfinal: any[]=[];
  numtalonario: any[]=[];
  
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
  arrayTalonarios:any = [];
  estado:number=0;
  talonario: any[] =[];
  arrayTabla :any[]=[];
  //datosTabla:  ventataalonario = new ventataalonario();
  //datosTabla: any[] = [];
  datosTabla: any[] = [];
  //datosTabla: ventataalonario = new ventataalonario
  conteotalonarios: number =0;
  conteotalonarios2: number =0;
  settingFormula = false;
 //idventatalonario: string ="";
 idventatalonario: string[] = [];
  conteo:number=0;
  intervaloID: any;
  amtrizlocalstorage: any[][] =[];
  arraysegunindexexterior: any =[];
 // datosencabezados:number[] =[];
 datosencabezados:any;
   numerodetalonario:number=0;
  facturainicial:number=0;
  facturafinal:number=0;
  //ejecutado: boolean = false;
  //ventasMesOperacioness: VentasMesOperaciones = new VentasMesOperaciones(this.dbLocal);
  hasPreviousValue: boolean = false; 
  previousValue: number | null = null;
  previousValue2: number | null = null;
  idmespuntoventasuma: string ="";
  mistalonarios: any;

  ngOnInit(){
    this.idmespuntoventasuma = String(this.route.snapshot.paramMap.get('idcentralizadormes'));
    
    console.log("hola hay aglo aquiuiiuiuiiuuiuiuiu", this.indexinterior)
    console.log("aqui estan mis talonariooooos-------------------------------------------------------------???",this.todotalonarios)
    this.mistalonarios = this.todotalonarios
    
        
     
          this.traertablasventas();
    // this.iniciarIntervalo();

   // console.log("Aqui va mi Index interior i", this.indexinterior);
   // console.log("Aqui va mi Index exterior j", this.indexexterior);
     console.log("11111 IDMESPUNTOVETNASUMA", this.idmespuntoventasuma);
     console.log("22222222 IDPUNTOVENTAACTIVIDAD", this.idpuntoventaactividad);
     console.log("33333333 NOMBREACTIVIDAD", this.nombreactividad);
     console.log("4444444", this.parametroDelPadreidcentralizadormes);
     console.log("55555 mi matrizzzzz", this.amtrizlocalstorage);
     console.log("666666 Mi matrizservice ",this.numberOfForms[this.indexinterior]);
     this.numberOfForms[this.indexinterior]=this.mistalonarios.length 
   
   
  }
  @HostListener('window:popstate', ['$event']) //para caundo se vaya atras
  async onPopState(event: any) {
    await this.guardarDatos();
    await this.guardarTalonariosDB();
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
       this.guardarDatos(); 
    }, 15000);
  }
  detenerIntervalo() {
    
    if (this.intervaloID) {
      clearInterval(this.intervaloID);
    }
  }




 


  async traertablasventas(){
 
    

    console.log("aquqwqwwq----------------------------------------ANTES DE SER TRANSFORMADOOOOOO ",this.mistalonarios)
    this.mistalonarios =await this.ventasMesOperaciones.transformarTalonario(this.mistalonarios,this.hotRegisterer)
  this.numberOfForms[this.indexinterior]=this.mistalonarios.length  /// con esto contaba los talonarios de mi datos que traia de mi db y le asignaba esa valor a numberofForms
                                                                ///numberforms es el input con el cual creo mis talonarios
    console.log("aquqwqwwq----------------------------------------despues DE SER TRANSFORMADOOOOOO ",this.mistalonarios)
  
  await this.actualizarFormularios();
 
    
   }




  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });
  
  

  async onNumberOfFormsChange() {
 
    
    console.log("aqui esta el cambio????",this.numberOfForms[this.indexinterior])
    await this.actualizarFormularios();
    
 
  }
 
 

  private actualizarFormularios() {
   

       
    
    const aumento = this.numberOfForms[this.indexinterior];  
    const catidadTotal = this.mistalonarios.length
   // const catidadTotal = this.hotSettingsArray.length
  ///ese el numero de mi forms de mi db
    
   // const cantidadFormularios = this.numberOfForms[this.index];
   // const formulariosActuales = this.posicionpuntoventa.idposicion?.talonario?.length;
   
   console.log('MI blavblablald,ada aquie stan todas mis cosas:', this.mistalonarios
   );
    if (aumento === catidadTotal) {
       let catidadTotal = this.mistalonarios.length;

      this.crearFormularios(aumento,catidadTotal);
    }else{
      
      if(aumento> catidadTotal){ //aqui quiere aumentar 
        this.crearFormularios(aumento,catidadTotal);
      //   if( this.posicionpuntoventa.idposicion?.talonario?.hotSettings?.data[1].monto !== null  ){ // tiene datos no quita tiene dato soliucinoar esto 
       //   console.log("no puedes quitar fromulariopor que hay datos");//mandar mensaje 
       //   this.messageService.add({ severity: 'error', summary: 'CUIDADO ', detail: 'No se puede Quitar el Talonairo por que Hay datos en el ' });
       //  }else{
        //  this.posicionpuntoventa.idposicion?.talonario?.pop()
         }
    }

    //const cantidadAumentar = aumento-catidadTotal 

    //que va a psaar si quiero aumentar?????

   // const cantidadFormularios = this.ventasMesOperaciones.datosTabla[0].length;  
    // const formulariosActuales = this.ventasMesOperaciones.datosTabla[0].length;             /// sobre los que ya estan, para que no me remplace o aumente mas de lo que es
    
    console.log('MI VALOR DE TALONARIOS Fotmulrios:', aumento);
    console.log('MI VALOR DE TALONARIOS TOTAL:', catidadTotal);
    //console.log('MI VALOR DE TALONARIOS A AUMENTAR:', cantidadAumentar);
    
    
    //this.crearFormularios(catidadTotal,aumento);
    
   

    
  
     
     
  }
  private crearFormularios(cantidad: number,valoaumentar:number) {
    
    console.log('MI blavblablald,ada aquie stan todas mis cosas: ENTRA A CREAR TALONARIOO????', this.mistalonarios)
     console.log("cantidad y valor a aaumentar ",cantidad,valoaumentar)
     
    // console.log("tamanio", this.ventasMesOperaciones.datosTabla.length)
    for ( let i = valoaumentar; i < cantidad; i++) {                 ///aqui itero la cantidad que se aumentare a mis handsontables "valoraumentar " hace eso, creo mis handsontable y los agrego a mi array de handsontable para mostrar  ami vista
        
        
     console.log("mi messsssssssssssssssssssssssssssssssssssssssssssss",this.idmespuntoventasuma)
     let  talonario = this.ventasMesOperaciones.agregarTalonario(this.idpuntoventaactividad, this.idmespuntoventasuma,this.hotRegisterer)
     console.log("mi messsssssssssssssssssssssssssssssssssssssssssssss9989899989898989889",talonario)
     this.mistalonarios.push(talonario); 
    
     
    
    }
    console.log("MI VENTAMESOPERACIONESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS??",this.mistalonarios)  //AQUI ESTARIA MIS DATOS SUPONGO EN EL ARRAY 
    console.log("mi hotsettingsarrray", this.hotSettingsArray)
   

   
  }


  



  
   
  

 async guardarDatos(){
  
           
        /*    switch (miarrayprincipal[i][j][k]?.monto) {
              case 'A':
              case 'a':
                
                this.estado = 1;
                miarrayprincipal[i][j][k].monto=0;
                break;
              case 'E':
              case 'e':
                
                this.estado = 2;
                miarrayprincipal[i][j][k].monto=0;
                break;
              case 'I':
              case 'i':
                
                this.estado = 3;
                miarrayprincipal[i][j][k].monto=0;
                break;
              default:
                this.estado=0;
                break;
            }}
            const jsonsumatalonario ={
              idsumatalonario:uuidv4(),
              numfactura: Number(miarrayprincipal[i][j][k]?.numfactura),
              monto: Number(miarrayprincipal[i][j][k]?.monto),
              estado: Number(this.estado),
              idventatalonario:String(iduuid),
            }
            this.jsonDatossumasArray.push(jsonsumatalonario);

            
            }
            else{
              break;
            }
      }//es k
      */
     
 //   } 
  }


  


  async guardarTalonarioslocalstorage(arrayTalonarios:any){
  
   await this.dbLocal.guardarsumasventaslocalstorage(arrayTalonarios)

 }
 





 
  async guardarTalonariosDB(){

    
    await this.dbLocal.guardarsumasventasDBlocalstorage();

  
  }
  
 

 
 
anulacionChange(iduuid:string){
  const tabla = this.mistalonarios.find((tabla:any) => tabla.iduuid === iduuid);
  if (tabla) {
    if (tabla.agregarFilas) {
      tabla.agregarFilas = false;
      const rango = tabla.factfinal - tabla.factinicial;

      for (let i = 0; i <= rango; i++) {
        this.hotRegisterer.getInstance(iduuid).alter('insert_row_below');
        this.hotRegisterer.getInstance(iduuid).setDataAtCell(i, 0, tabla.factinicial + i);
        this.hotRegisterer.getInstance(iduuid).setDataAtCell(i, 1, tabla.montodinamico);
      }
    }

    // Más lógica según sea necesario
  }

} 

bloqueartabla(index:number){
  this.hotSettingsArray[index].bloqueada=true;
  
  this.botonBloqueado = true;
  this.habilitarinicio=true;
  this.habilitarfin=true;
}



}