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


@Component({
  selector: 'app-talonariosventas',
  templateUrl: './talonariosventas.component.html',
  styleUrls: ['./talonariosventas.component.css'],
  providers: [ HotTableRegisterer ]
})
export class TalonariosventasComponent   {
  @Input() idmespuntoventasuma: any;  
  @Input() idpuntoventaactividad: any;  
  @Input() nombreactividad: any;  
  @Input()  parametroDelPadreidcentralizadormes: string='';  
  @Input()  indexinterior: any;  
  @Input()  indexexterior: any;  
  @Input() posicion: any;
  @ViewChild('numFacturaInput', { static: false }) numFacturaInput!: ElementRef;
 


  valorCelda: any; 

 
  
  constructor(private formBuilder: FormBuilder,
              public talonarios: NuevomesService, 
              private hotRegisterer: HotTableRegisterer,
              public ventastalonarioService: VentatalonarioService,
              public sumatalonarioService: SumatalonarioService,
              public messageService: MessageService,
              public dbLocal: LocalStorageService,
              private matrizventaService: MatrizventasService,
              private cdr: ChangeDetectorRef,
             
             )
             { this.matrizventaService.matrizLocalstorage = [];              
              }
              
  logicaEjecutada = false;
  //numberOfForms: number = 0;
  contadorNgOnInit:number=0;
  numberOfForms: any [] = [];
  formArray: FormGroup[] = [];
  hotSettingsArray: any[] =[]; //esto contiene todas mis isntancias de handsontable
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
  ngOnInit(){
    //if (!this.ejecutado) {


     this.traerlocalstorage();
     this.iniciarIntervalo();
     
    
    console.log("Aqui va mi Index interior i", this.indexinterior);
    console.log("Aqui va mi Index exterior j", this.indexexterior);
     console.log("11111 IDMESPUNTOVETNASUMA", this.idmespuntoventasuma);
     console.log("22222222 IDPUNTOVENTAACTIVIDAD", this.idpuntoventaactividad);
     console.log("33333333 NOMBREACTIVIDAD", this.nombreactividad);
     console.log("4444444", this.parametroDelPadreidcentralizadormes);
     console.log("55555 mi matrizzzzz", this.amtrizlocalstorage);
     console.log("666666 Mi matrizservice ", this.matrizventaService.matrizLocalstorage);
   
   
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




  async traerlocalstorage(){
    
    await this.dbLocal.traerventaslocalstorage(String(this.idmespuntoventasuma),1)

    console.log("VEZ QUE ENTRA AL LOCAL STORAGE A TRAER",this.conteo++);
    await this.traertablasventas();
  }


  async traertablasventas(){
 
    //this.datosTabla =[];
     this.datosTabla = await this.dbLocal.GetVentas();
  
 
   console.log("MI THIS DATOS TABLAAAAS",this.datosTabla)
   
    for( let i=0; i< this.datosTabla.length;i++){
   
    //this.conteotalonarios=0;
      for( let j=0; j< this.datosTabla[i].length;j++){
        console.log("aqui hay algooooo", this.datosTabla[i][j].idpuntoventaactividad);
      if( this.idpuntoventaactividad === this.datosTabla[i][j].idpuntoventaactividad && this.idmespuntoventasuma === this.datosTabla[i][j].idcentralizadormes){
         //estoy apartando segun idactividad y mes, para poner a cada input su propio valor ya que estoy traendo varios datos de una y tengo que separar   
        this.conteotalonarios++;
            
        

        this.idventatalonario[j]= this.datosTabla[i][j].idventatalonario
        this.factinicial[j]= this.datosTabla[i][j].factinicial;
        this.factfinal[j]= this.datosTabla[i][j].factfinal;
        this.numtalonario[j] = this.datosTabla[i][j].numtalonario;
             
        
      }

     
    }
    
 
  }

  this.numberOfForms[this.indexinterior]=this.conteotalonarios
  
  await this.onNumberOfFormsChange();


    // if(this.idpuntoventaactividad == data.idpuntoactividad && this.parametroDelPadreidcentralizadormes === data.idcentralizadormes){
    //}
   
   
       
   }




  hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });
  

  async onNumberOfFormsChange() {
    await this.actualizarFormularios();
  }

  private actualizarFormularios() {
   
    //const cantidadFormularios = this.numberOfForms;
    //this.crearFormularios(cantidadFormularios );
    const cantidadFormularios = this.numberOfForms[this.indexinterior];
    const formulariosActuales = this.hotSettingsArray.length;
    const ultimoValor = this.hotSettingsArray.length-1; 
    
    
    
    if (cantidadFormularios > formulariosActuales) {
      this.crearFormularios(cantidadFormularios,formulariosActuales);
    }else if(cantidadFormularios< formulariosActuales){ //aqui quiere reducir 
         if(this.hotRegisterer.getInstance('talonario'+ultimoValor).getData()[0][0] !== null  ){ // tiene datos no quita tiene dato
          
          this.messageService.add({ severity: 'error', summary: 'CUIDADO ', detail: 'No se puede Quitar el Talonairo por que Hay datos en el ' });
         }else{
          this.hotSettingsArray.pop()
          this.numtalonario.pop()
          
         }
    }
     
     
  }
  private crearFormularios(cantidad: number,valoaumentar:number) {
    //if(this.hotRegisterer.getInstance('talonario'+index).getData()) ==)
    //this.hotSettingsArray =[];
    
  
    for ( let i = valoaumentar; i < cantidad; i++) {
       this.numtalonario[i]=i+1;
      

      //this.factinicial[i]= 
      const form = this.formBuilder.group({
        
        field1: ['', Validators.required],
        field2: ['']
      });
      const  isHotReadOnly: boolean = false;//ver esto para bloquear la tabla
      const hotSettings: Handsontable.GridSettings = {
        formulas: {
          engine: this.hyperformulaInstance,       //con esto funciona las formulas
        },
        
        data: [
                     
          
        ],
        afterFormulasValuesUpdate : (changes) => { //contiene el valor de la celda de las sumas
      
          this.suma = this.hotRegisterer.getInstance('talonario'+i).getDataAtCell(0,2 );
         
        
        
        
        
      },
       
        afterChange : (changes,source) =>{
          if (!this.settingFormula) {
            this.settingFormula = true;
            this.hotRegisterer.getInstance('talonario'+i).setDataAtCell(0, 2, '=SUM(B:B)');
            this.settingFormula = false;
          }
            
          

        //  this.hotRegisterer.getInstance('tabla3').setDataAtCell(0, 2, '=SUM(B:B)');

        if (changes || source === 'edit') {
          //console.log("Changes:", changes[3]);
          changes!.forEach((changes, index, array) => {
            const oldValue = changes[2]
            const row = changes[0];
            const value = changes[3]  //aqui esta el valor de las casillas
            const col =changes[1];
            const rowCount = this.hotRegisterer.getInstance('talonario'+i).countRows();
            
              if (col === 'monto') {
               // console.log("entra al col",col);
                //const numero = parseInt(value, 10);
                if (value) {
                 
                    this.hotRegisterer.getInstance('talonario'+i).setDataAtCell(row, 0, this.factinicial[i] + row); //con esto pone automaticamente numeros siempre y cuando ponga fact inicial
                
                  
                  }
             
            
            switch (value) {
              case 'I':
              case 'i':
                this.hotRegisterer.getInstance('talonario'+i).setCellMeta(changes[0], 1, 'className', 'colornegro');//esto cambia el color de la celda
                break;
              case 'A': 
              case 'a':
                this.hotRegisterer.getInstance('talonario'+i).setCellMeta(changes[0], 1, 'className', 'colorrojo');
                break;
              case 'E':
              case 'e':
                this.hotRegisterer.getInstance('talonario'+i).setCellMeta(changes[0], 1, 'className', 'colorazul');
                break;
              default:
                this.hotRegisterer.getInstance('talonario'+i).setCellMeta(changes[0], 1, 'className', 'colorblanco');
                break;
            }
            this.hotRegisterer.getInstance('talonario'+i).render(); 
            
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
        
    
        /*columns: [
          {
            data: 'NºFactura',
            //readOnly: false,    //esto bloquea la celda para que solo sea de lectura
            //editor: false,
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
        ],*/
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
     
      this.hotSettingsArray.push(hotSettings);
      


        
      //console.log("AQUI TENDRIA QUE PONER MIS DATAS EN UN FOR O ALGO", this.hotSettingsArray[0].data)
    }
    console.log("MI HOTSETTINGSARRAY??",this.hotSettingsArray)
    console.log("que es datoTabla????",this.datosTabla)

 
    
   
    
    for( let i=0; i< this.datosTabla.length;i++){
      for( let j=0; j< this.datosTabla[i].length;j++){
      if( this.idpuntoventaactividad === this.datosTabla[i][j].idpuntoventaactividad && this.idmespuntoventasuma === this.datosTabla[i][j].idcentralizadormes){
       //comparo mis datos para que se vayan a su lugar correcto
        this.hotSettingsArray[j].data = this.datosTabla[i][j].sumaventatalonario;
        console.log("mi fact inical aqui",this.factinicial[j])
        console.log("mi fact final aqui",this.factfinal[j])
        console.log("mi numtalonario aqui", this.numtalonario[j])
       
        
        let misencabezados ={
          factinicial:this.datosTabla[i][j].factinicial,
          factfinal:this.datosTabla[i][j].factfinal,
         numtalonario:this.datosTabla[i][j].numtalonario,
        }
      
       
        console.log("MI HOTSETTINGSARRAY que esto guardando aqui??",this.hotSettingsArray[j].data)
       this.matrizventaService.datosencabezados.push(misencabezados);
      } 
      
    }

  }
  
  let exterior=this.indexexterior;
  let interior=this.indexinterior;
  console.log("MIS ENCABEZADOOOOOOOOOOOOOOOOOOOOO",this.matrizventaService.datosencabezados)
  
  console.log("MI HOTSETTINGSARRAY que esto guardandhtyyo aqui??",this.hotSettingsArray)

 
  if (!this.matrizventaService.matrizLocalstorage[exterior]) {
    this.matrizventaService.matrizLocalstorage[exterior] = [];
  }
  
  // Asegurarse de que la posición [j][i] esté inicializada
  if (!this.matrizventaService.matrizLocalstorage[exterior][interior]) {
    this.matrizventaService.matrizLocalstorage[exterior][interior] = [];
  }
  let datosCombinados = {
    hotSettingsArray: this.hotSettingsArray,
    misencabezados: this.matrizventaService.datosencabezados,
   
  };
  
  
  this.matrizventaService.matrizLocalstorage[exterior][interior] = [
    //...this.matrizventaService.matrizLocalstorage[exterior][interior],
    datosCombinados
  ];

   
  }


  



  
   
  

 async guardarDatos(){
  console.log("HOLOOOOOOOOOOS mi fact inicial  mi fact ifdnal mi talonario cuantas veces ENTRARARARARARARARAR",this.numtalonario,this.factinicial,this.factfinal)
  
  await this.convertircabecera();


 

  


  
  
  
console.log("aquie staran mis encabezados???",this.matrizventaService.datosencabezadoscrear)
//console.log("aquie staran mis encabezados PRUEBA EMPTY???",this.matrizventaService.datosencabezadoscrear[this.indexexterior][this.indexinterior])
//console.log("aquie staran mis encabezados mis cosas???",this.matrizventaService.datosencabezadoscrear[this.indexexterior][this.indexinterior][0])
console.log("index exterior index interior???",this.indexexterior,this.indexinterior)

  console.log("ASI ME LLEGAN MIS DATOOOOOOS", this.matrizventaService.matrizLocalstorage)
  const extractedDataArray = this.matrizventaService.matrizLocalstorage.flatMap((handsontable: any) =>
  handsontable.map((item: any) =>
    item[0].hotSettingsArray?.flatMap((settings: any) =>
      settings.data?.map((dataItem: any) => ({
        monto: dataItem.monto,
        numfactura: dataItem.numfactura,
        misencabezados: item[0].misencabezados,
      }))
    )
  )
);
console.log("aqui que hay que transfroma",extractedDataArray ) ///aqui le pone en arrays segun los punto de venta osea 3  segun si tentgo datos o no 
let separatedArrays = [];
let currentArray = [];
 let miarrayprincipal =[]
for (const item of extractedDataArray) {   
  for (const datos of item) {
  if (typeof datos?.monto !== 'undefined' &&  typeof datos?.numfactura !== 'undefined') {
    currentArray.push(datos);
  } else {
    separatedArrays.push(currentArray);
    currentArray = [];
  }
}
miarrayprincipal.push(separatedArrays)
      separatedArrays =[];
}
this.numerodetalonario=0;
this.facturainicial=0;
this.facturafinal=0;
console.log("AQUI TENDRIA QEUE STAR MIS DATOS SIUUUUUU:", miarrayprincipal); 
console.log("Mi cabeceraaaaaaaaaaaaaaa",this.matrizventaService.datosencabezadoscrear)
console.log("elkl tdoooooooo???????????????",this.matrizventaService.arraycabeceratodo) 
for (let i = 0; i < miarrayprincipal.length; i++) {

  const arrayinterno= miarrayprincipal[i]
  console.log("el tamanio de mi array internooo",arrayinterno)
 
  for (let j = 0; j < arrayinterno.length; j++){ 

    if(miarrayprincipal[i][j][0]?.misencabezados.length === 0)
    {
      
      //if(this.matrizventaService.arraycabeceratodo[i].length != 0){
        if((typeof this.matrizventaService.arraycabeceratodo[i]   === 'undefined')){
               break;
    //  miarrayprincipal[i][j][0]?.misencabezados = miarray ;
    }else{
      console.log("aquie staran mis encabezados o que es estooooasas 111???",this.matrizventaService.arraycabeceratodo[i] , j)
      console.log("aquie staran mis encabezados o que es estooooasas 222???",this.matrizventaService.arraycabeceratodo[i][0] , j)
      console.log("aquie staran mis encabezados o que es estooooasas???",this.matrizventaService.arraycabeceratodo[i][0] , j)
      console.log("aquie staran mis encabezados o que es estoooo???",this.matrizventaService.arraycabeceratodo[i][0]?.numerodetalonario , j)
     const misencabezados = {
      numtalonario: this.matrizventaService.arraycabeceratodo[i][0]?.numerodetalonario[j],
       factinicial:this.matrizventaService.arraycabeceratodo[i][0]?.facturainicial[j],
       factfinal:this.matrizventaService.arraycabeceratodo[i][0]?.facturafinal[j]
      }
      this.matrizventaService.misencabezados.push(misencabezados);
      if (miarrayprincipal[i]?.[j]?.[0]) {
        miarrayprincipal[i][j][0].misencabezados =  this.matrizventaService.misencabezados[i]
      } else {
        console.error("No se puede acceder a la propiedad misencabezados debido a que la ruta puede ser nula o indefinida.");
      }
      
      
      if (miarrayprincipal[i]?.[j]?.[0]) {
        miarrayprincipal[i][j][0].misencabezados = misencabezados;
      } else {
        console.error("No se puede acceder a la propiedad misencabezados debido a que la ruta puede ser nula o indefinida.");
      }

    }
  //}
    }

  }
}
   
  
console.log("AQUI TENDRIA QEUE STAR MIS DATOS SIUUUUUU:", miarrayprincipal); ///hay que trabajar con esto // esto separa por talonarios sigue siendo 3 arrays(si tiene datos) pero tienes los talonarios dentro

  console.log("HOLOOOS mi fact inical",this.factinicial)
  console.log("HOLOOOS mi fact final",this.factfinal)
  console.log("HOLOOS mi numtalonario", this.numtalonario)
  
      this.arrayTabla=[]
      this.jsonDatossumasArray=[]
      this.jsonDatosArray=[]
     for (let i = 0; i < miarrayprincipal.length; i++) {

      const arrayinterno= miarrayprincipal[i]
      console.log("el tamanio de mi array internooo",arrayinterno)
     
      for (let j = 0; j < arrayinterno.length; j++){ 
        console.log("ENTRA  AJ????? ESTE ES MI TAMANIO", j, arrayinterno.length)
       
       
        this.jsonDatossumasArray= [];
     //   if(!miarrayprincipal[i][j][0]?.misencabezados){
          console.log("mi encabezados  no existe ")
      //  if(miarrayprincipal[i][j][0].misencabezados.length === 0  ){ //aqui tengo que recuperar //ESTO ME ARROJA ERROR CREO QUE ENO LEE MIS ENCABEZADOS
          this. numerodetalonario= Number(miarrayprincipal[i][j][0]?.misencabezados?.numtalonario)
          this. facturainicial=  Number(miarrayprincipal[i][j][0]?.misencabezados?.factinicial)
          this. facturafinal= Number(miarrayprincipal[i][j][0]?.misencabezados?.factfinal)
           
           
      //}  
       

       
      //}else{  //aqui estamos creandoe l talonario
        //aqui tendria que anadirle????????

        console.log("aquie staran mis encabezados PRUEBA EMPTY2222222??? LO QUE LE LELGA ALKA FUNCION",this.matrizventaService.datosencabezadoscrear) //PRO0BARE CONE STE
        //console.log("aquie staran mis encabezados PRUEBA EMPTY2222222??? LO QUE LE LELGA ALKA FUNCIONasdasdad",this.matrizventaService.datosencabezadoscrear[i][j], i,j) //PRO0BARE CONE STE
        console.log("aquie staran mis encabezados PRUEBA EMPTYewrwerwerwerwerw2222222??? DESPUES DE LA FUNCION",this.matrizventaService.arraycabecera) //con este funcionaaaaa
        console.log("aquie staran mis encabezados ESTE ES EL QUE NECESITOOOOOOO??? DESPUES DE LA FUNCION",this.matrizventaService.arraycabeceratodo) 
        console.log("aquie staran mis encabezados ESTE ES EL QUE NECESITOOOOOOO??? ERRRORRRRR",this.matrizventaService.arraycabeceratodo[i] ,i) 
        //console.log("aquie staran mis encabezados PRUEBA EMPTY2222222???TAMANIOOO",this.matrizventaService.datosencabezadoscrear.length)
        //console.log("aquie staran mis encabezados PRUEBA EMPTY2222222???",this.matrizventaService.datosencabezadoscrear[i])
        //console.log("MIS I2 mi J2" ,j,i)
       // //console.log("como entro??/???",this.matrizventaService.datosencabezadoscrear[i][j])
        //console.log("aquie staran mis encabezados PRUEBA EMPTY???",this.matrizventaService.datosencabezadoscrear)
        //console.log("MIS INDEX EXTERIO E INTERIO",[this.indexexterior],[this.indexinterior])
        //console.log("MIS I mi J" ,j,i)
        //console.log("MI CABECERA TODOOOOOOOOOO",this.matrizventaService.arraycabeceratodo)
        //console.log("AQUI TENDRIA QEUE STAR MIS DATOS SIUUUUUU:", miarrayprincipal); 
        //console.log("MI CABECERA TODOOOOOOOOOasdasdO",this.matrizventaService.arraycabeceratodo[0])
             //console.log("que hay joijoasdjiuhah",this.matrizventaService.datosencabezadoscrear[i])
             //console.log("que hay joijoasdjiuhah2222",this.matrizventaService.datosencabezadoscrear[i][0])
       // if( (typeof this.matrizventaService.arraycabeceratodo[i]   !== 'undefined')){
          //console.log("ENTRA NO ES UNDEFINIED")
            //   this. numerodetalonario= this.matrizventaService.arraycabeceratodo[i]?.numerodetalonario[j]; //esto funciona siempre y cuando solo sea en un lado falta para cuandos sea para otros puntos de actividad
           //    this.facturainicial= this.matrizventaService.arraycabeceratodo[i]?.facturainicial[j];
          //     this.facturafinal=   this.matrizventaService.arraycabeceratodo[i]?.facturafinal[j];
        //}

     // }

        
        const iduuid =uuidv4();
        const jsontalonario = {
          idventatalonario: iduuid,
          numtalonario: this.numerodetalonario,
          factinicial:this.facturainicial ,
          factfinal:this. facturafinal,
          tipo: Number(this.tipotalonario),
          montototal:  0, //o this.valorsuma
          idpuntoventaactividad:String(this.idpuntoventaactividad),
          idcentralizadormes:String(this.idmespuntoventasuma),
          sumaventatalonario:[],
        };
        console.log("mi json talonario xdxdxd", jsontalonario)

        for (let k = 0; k < miarrayprincipal[i][j].length; k++){ 
      if(this.facturainicial !=0  && this.facturafinal !=0){
        
      
          if (miarrayprincipal[i][j][k]?.idventatalonario !=null ) {
           
            switch (miarrayprincipal[i][j][k]?.monto) {
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
      if(jsontalonario.factinicial !==0 && jsontalonario.factfinal !==0  ){
        
       this.jsonDatosArray.push(jsontalonario)
       this.jsonDatosArray[j].sumaventatalonario = [this.jsonDatossumasArray]; 
       this.jsonDatossumasArray= []; 
      }
      else { console.log("no hay factura inical ni final ") ;break}
      }///es j
       if(this.jsonDatosArray.length !== 0){
       this.arrayTabla.push(this.jsonDatosArray);
       this.jsonDatosArray = []; 
       }
    
      } //es i
         
  console.log("este es mi array tabla", this.arrayTabla)
    await this.guardarTalonarioslocalstorage(this.arrayTabla);
 //   } 
  }


  


  async guardarTalonarioslocalstorage(arrayTalonarios:any){
    console.log("mis datos para setear al LOCAL STORAGE",arrayTalonarios);
   await this.dbLocal.guardarsumasventaslocalstorage(arrayTalonarios)

 }
 

 async buscarcabcera(){


 }





 
  async guardarTalonariosDB(){

    
    await this.dbLocal.guardarsumasventasDBlocalstorage();

    //aqui hay este 
    /*console.log("aquie sta mi index",index)
    console.log("aquie sta mis cosas", this.idventatalonario[index])
    if(this.idventatalonario[index]){//hay este id en sumasdetalles
      console.log("este  si tiene datos");
    const source$ = this.ventastalonarioService.getventaactividadbusqueda(this.idventatalonario[index]); //con esto traigo el id
    const data:any = await lastValueFrom(source$);
    console.log("mis datos data",data)
    const resultado = data.find((item: any) => item.idventatalonario === this.idventatalonario[index]); //buiscando si hay datos en mi tabla
    console.log("resultado",resultado);
 
   //exisate este dato?????
     arrayTalonarios.forEach(async (json :any) => {
      if(!resultado){
        //no hay datos, creamos
        await this.crearTalonarios(json.arraytalonario,json.arraysumatalonario);
      }else{
        //si hay datos, borramos y creamos
        await this.ventastalonarioService.deleteVentatalonario(this.idventatalonario[index]);
        await this.crearTalonarios(json.arraytalonario,json.arraysumatalonario);
        //await this.ventastalonarioService.createVentatalonario(json.arraytalonario);
        //await this.sumatalonarioService.createSumatalonario(json.arraysumatalonario);
      }
      console.log("aqui tendria que estar mi talonario",json.arraytalonario); //aqui ahcer el await
      console.log("aqui tendria que estar mis sumas???",json.arraysumatalonario); 
  });
}else{
     // await this.crearTalonarios(arraytalonario,arraysumatalonario);
      console.log("no hay este id");
      arrayTalonarios.forEach(async (json :any) => {
          await this.crearTalonarios(json.arraytalonario,json.arraysumatalonario);   
    });
     
  }


}
  async crearTalonarios(arraytalonario:any,arraysumatalonario:any){
    await this.ventastalonarioService.createVentatalonario(arraytalonario);
    await this.sumatalonarioService.createSumatalonario(arraysumatalonario);
    */
  }
  
  async convertircabecera(){
    //if(!this.logicaEjecutada){
    console.log("MIIUIIIIIII MIIIIIIIII factura inicla mi final y mi numtlaonario",this.numtalonario,this.factinicial,this.factfinal)
    if(this.numtalonario.length != 0  && this.factinicial.length !=0 && this.factfinal.length !=0){
    //let arraycabecera =[]
 //for (let i = 0; i < this.numtalonario.length; i++){
  if(!this.logicaEjecutada){
 const cabecera ={
    numerodetalonario :  this.numtalonario,
   facturainicial: this.factinicial,
   facturafinal:   this.factfinal
  }
  console.log("MI CABECERAAAA", cabecera)
  
  this.matrizventaService.arraycabecera.push(cabecera)

  
 //}
 console.log("mi   CABECERA ARRAY ", this.matrizventaService.arraycabecera)

 if (!this.matrizventaService.datosencabezadoscrear[this.indexexterior]) {
  this.matrizventaService.datosencabezadoscrear[this.indexexterior] = [];
  }
  
  // Asegurarse de que la posición [j][i] esté inicializada
  if (!this.matrizventaService.datosencabezadoscrear[this.indexexterior][this.indexinterior]) {
  this.matrizventaService.datosencabezadoscrear[this.indexexterior][this.indexinterior] = [1,1];
  }
  
  this.matrizventaService.datosencabezadoscrear[this.indexexterior][this.indexinterior] = 
  //...this.matrizventaService.matrizLocalstorage[exterior][interior],
     this.matrizventaService.arraycabecera
     this.logicaEjecutada = true; 
    }
  await this.conversioncabecera();
  
}

  }

  async conversioncabecera(){
  let miarray = []
  // Verifica si datosencabezadoscrear[0] está definido y tiene una longitud mayor que cero
//if (this.matrizventaService.datosencabezadoscrear[0] && this.matrizventaService.datosencabezadoscrear[0].length > 0) {
  // Obtiene el último elemento del primer array
  console.log("EN MI CONVERSION DE DATOSENCABEZADOSCREAR",this.matrizventaService.datosencabezadoscrear);
  console.log("EN MI CONVERSION DE DATOSENCABEZADOSCREAR tamaniooooo",this.matrizventaService.datosencabezadoscrear.length);
  console.log("EN MI CONVERSION DE DATOSENCABEZADOSCREARADASDASDASDASD",this.matrizventaService.datosencabezadoscrear[0]);
  //const ultimoarray = this.matrizventaService.datosencabezadoscrear[0][this.matrizventaService.datosencabezadoscrear[0].length - 1];
  for(let i=0; i<this.matrizventaService.datosencabezadoscrear.length;i++){
    if((typeof this.matrizventaService.datosencabezadoscrear[i]   === 'undefined')){
      this.matrizventaService.datosencabezadoscrear[i] = [8888];

    }
  }
  const ultimoarray = this.matrizventaService.datosencabezadoscrear[this.matrizventaService.datosencabezadoscrear.length - 1];
  

  console.log("AQUI VA TODOOOO---------------------------------",ultimoarray);
  this.matrizventaService.arraycabeceratodo = ultimoarray

  
  }

  anulacionChange(index:number){
     //nos quedamos aqui
    
    
     if(this.agregarFilas[index]==true){
     this.agregarFilas[index]=false;
     this.rango = this.factfinal[index]-this.factinicial[index];
     console.log("aqui estan mi rango",this.rango);
    for (var i=0; i<= this.rango; i++) {

      const fact=this.factinicial[index];
      this.hotRegisterer.getInstance('talonario'+index).alter('insert_row_below');   //esto crea las columnas que yo quiera
      this.hotRegisterer.getInstance('talonario'+index).setDataAtCell(i,0,this.factinicial[index]);
      this.hotRegisterer.getInstance('talonario'+index).setDataAtCell(i,1,this.montodinamico);//aqui pone los datos en la casillas
      //this.datostalonarios.push({monto:this.montodinamico}); 
    }
  
    console.log("aqui estan mi checkbox",this.agregarFilas[index],0,this.factinicial[index]);
    console.log("aqui estan mi checkbox",this.agregarFilas[index],1,this.montodinamico);
    
    
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