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
  @Input()  index: any;  
  @Input() todotalonarios: any;
  
  numberOfFormss: number = 0;
  formArray2: FormGroup[] = [];


  constructor(private formBuilder: FormBuilder,
    
    private hotRegisterer: HotTableRegisterer,
    public ventastalonarioService: VentatalonarioService,
    public sumatalonarioService: SumatalonarioService,
    public messageService: MessageService,
    public dbLocal: LocalStorageService,
    public talonarios: NuevomesService,
    private matrizventaService: MatrizventasService,
    private cdr: ChangeDetectorRef,
   
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
    ngOnInit(){
      //this.iniciarIntervalo();
      this.crearPosiciones();
    }

    async crearPosiciones(){
      const datosEspecificos = {                                     //aqui me formo mi json con mis ids idmes y puntoactividad con el tipo y su talonario [] 
        idpuntoventaactividad:this.idpuntoventaactividad,            //para tener almacenado en un array de servicio mis datos
        idmes:this.idmespuntoventasuma,
        tipo:2,
        talonario:[]
      
      };
       const existente = this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado.find((item:any) => //esto controla que no se repita datos en mi matriz 
        item.idposicion.idpuntoventaactividad === this.idpuntoventaactividad &&
        item.idposicion.idmes === this.idmespuntoventasuma
      );
      
      if (!existente) {    // Si no existe, agregar un nuevo objeto
        this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado.push({      ///aqui agrego mis json de posiciones
          idposicion: datosEspecificos,
        });
      } else {
        // Si existe
      }

      this.posicionpuntoventa = this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado.find((item:any) => item.idposicion.idmes === this.idmespuntoventasuma && item.idposicion.idpuntoventaactividad === this.idpuntoventaactividad);
       //con esto obtengo la posicion donde me encuentro
      console.log("que hay aquiiiiiiiiiesataaasd-----------------------------ES MI POSICION ",this.posicionpuntoventa) //este es mi posicion donde me encuentro

       await this.traerlocalstorage();

    }

    iniciarIntervalo() {
    
      this.intervaloID =  setInterval(() => {
         this.pruebaactualizacvion(); 
      }, 15000);
    }
    detenerIntervalo() {
      
      if (this.intervaloID) {
        clearInterval(this.intervaloID);
      }
    }
  
  
    async traerlocalstorage(){   //con esto hago mi peticion de mis datos directo a la db 

     await  this.dbLocal.traerventasPrevaloradaslocalstorage(String(this.idmespuntoventasuma),2);

      await this.traertablasventas();   
    }


    async traertablasventas(){     ///para evitar esto podria traer el conteo de talonario directo de la db 

    let datosdecompras=this.dbLocal.GetVentasPrevaloradas()  
    this.datosTabla = datosdecompras;
      console.log("ESTOS SON MIS DATOS DEL LOCALSTORAGE", this.datosTabla)
    for( let i=0; i< this.datosTabla.length;i++){
      for( let j=0; j< this.datosTabla[i].length;j++){
      if( this.idpuntoventaactividad === this.datosTabla[i][j].idpuntoventaactividad && this.idmespuntoventasuma === this.datosTabla[i][j].idcentralizadormes){
         //estoy apartando segun idactividad y mes, para poner a cada input su propio valor ya que estoy traendo varios datos de una y tengo que separar   
         this.conteotalonarios++;     
      }
    }
     console.log("que hay aquiiiiii", this.conteotalonarios)
  }
  this.numberOfForms[this.index]=this.conteotalonarios
  console.log("CONTEOOOOOOOOOOOOOOOOOOOOOOOOOOOO", this.conteotalonarios);
  await this.onNumberOfFormsChange();  
   }

   async pruebaactualizacvion(){
    console.log("TODOS MIS TALONARIOS",this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado)
   }
    
  
    async onNumberOfFormsChange() {
      await this.actualizarFormularios();
    }
    private actualizarFormularios() {
   
      //const cantidadFormularios = this.numberOfForms;      //aqui hago lo mismo que ventas normales, hago mi calculo de cuantos datos agregaria a mi array de handsontables
      //this.crearFormularios(cantidadFormularios );
      const cantidadFormularios = this.numberOfForms[this.index];
      const formulariosActuales = this.posicionpuntoventa.idposicion?.talonario?.length;
     
  
      if (cantidadFormularios > formulariosActuales) {
        this.crearFormularios(cantidadFormularios,formulariosActuales);
      }else if(cantidadFormularios< formulariosActuales){ //aqui quiere reducir 
           if( this.posicionpuntoventa.idposicion?.talonario?.hotSettings?.data[1].monto !== null  ){ // tiene datos no quita tiene dato soliucinoar esto 
            console.log("no puedes quitar fromulariopor que hay datos");//mandar mensaje 
            this.messageService.add({ severity: 'error', summary: 'CUIDADO ', detail: 'No se puede Quitar el Talonairo por que Hay datos en el ' });
           }else{
            this.posicionpuntoventa.idposicion?.talonario?.pop()
           }
      }
       
       
    }

  
    async  crearFormularios(cantidad: number,valoaumentar:number) {
      //if(this.hotRegisterer.getInstance('talonario'+index).getData()) ==)
      //this.hotSettingsArray =[];
      console.log("entra a crear fomulariooooooooooooooooooos",cantidad,valoaumentar)
      console.log("mnis cosas para verificar",this.idmespuntoventasuma ,this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado)
      console.log("mnis cosas para verificar222222",this.idpuntoventaactividad ,this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado)
      console.log("ESTOS SON MIS DATOS DEL LOCALSTORAGE QU TRAIGO DE LA DB TAMBIEN", this.datosTabla)
      console.log("ESTA ES MI POSICIIOOOOOOOOON", this.posicionpuntoventa.idposicion?.talonario)
      for ( let i = valoaumentar; i < cantidad; i++) {
       //aqui tendria que colocar los datos que ya tengo 
        // if(this.datosTabla)    ///aqui falta tendria que recorrer todo mi array para buscar y poder rempplazar  todos mi datos 
        if (this.posicionpuntoventa.idposicion?.talonario.length ===0) { //solo entra una vez
        this.datosTabla.forEach(async (array) => { //aqui busca en el array que traje de mi db elresultado para que le coloque en el lugar donde es en la posicion donde se encuentra 
          const talonario = array.find((item: any) => {
            return item.idpuntoventaactividad === this.idpuntoventaactividad && item.idcentralizadormes === this.idmespuntoventasuma;
          });
        if(talonario){ //aqui tendria que crear todos los datos que tengo en mi db y mostrarlos en mis talonarios
          console.log("asidjoiasdjaoisdhnaiosdjDONDE ESTOY TMR",talonario)
          const tablatalonariosprevalorados : FormularioPrevalorado = new FormularioPrevalorado(this.hotRegisterer);  //aqui va lo importante  aqui creo mi objeto completo y le pongo a la posicion que le corresponde
          tablatalonariosprevalorados.factinicial = talonario.factinicial;
          tablatalonariosprevalorados.factfinal = talonario.factfinal;
          tablatalonariosprevalorados.hotSettings.data = talonario.sumatalonarios;
          this.posicionpuntoventa.idposicion?.talonario?.push(tablatalonariosprevalorados) //aqui tambien falta poner en que posicion colocare los datos 
          
          console.log("ESTO TENGO QUE ITERARAA WACHIIIN",this.posicionpuntoventa)
        }else{
          await this.creartalonarioVacio();
        }
  
        });        //donde tendruas que segui this.datosTabla es igual al manejo de datos
      }
      else{   //esto funciona cuando no hay ningun dato pero cuando hya me retpite lo que comparo  
       /* const tablatalonariosprevalorados : FormularioPrevalorado = new FormularioPrevalorado(this.hotRegisterer);  //aqui va lo importante  aqui creo mi objeto completo y le pongo a la posicion que le corresponde
        tablatalonariosprevalorados.factinicial = 0;
        tablatalonariosprevalorados.factfinal = 0;
        this.posicionpuntoventa.idposicion?.talonario?.push(tablatalonariosprevalorados) 
*/      
        await this.creartalonarioVacio();
      }
      }
       this.tablas =  this.posicionpuntoventa.idposicion?.talonario;

      //aqui tendria que setear???/
       console.log("MIS TABLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS", this.tablas)
       console.log("TODOS MIS TALONARIOS",this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado)
     
      this.cdr.detectChanges();
      
    }
 
  
   async creartalonarioVacio(){
    const tablatalonariosprevalorados : FormularioPrevalorado = new FormularioPrevalorado(this.hotRegisterer);  //aqui va lo importante  aqui creo mi objeto completo y le pongo a la posicion que le corresponde
        tablatalonariosprevalorados.factinicial = 0;
        tablatalonariosprevalorados.factfinal = 0;
       await this.posicionpuntoventa.idposicion?.talonario?.push(tablatalonariosprevalorados)
   }


   async guardar(index:number){
    console.log("MIS TABLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS", this.tablas)
    console.log("aquie esta mi matriz completaaaaaaa",   this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado)
   }







   //desde aqui viene aya fuardar en el LS/DB automaticamente 
    async guardarDatos(index:number){

      
    for (let i = 0; i< this.hotSettingsArray.length; i++) {
    const iduuid =uuidv4();
    const matriz=this.hotRegisterer.getInstance('talonario'+i).getData();
  
    const jsontalonario = {
      idventatalonario: iduuid,
      numtalonario: i+1,
      factinicial: Number(this.factinicial[i]),
      factfinal: Number(this.factfinal[i]),
      tipo: Number(this.tipotalonario),
      montototal: Number(matriz[0][2])|| 0, //o this.valorsuma
      idpuntoventaactividad:String(this.idpuntoventaactividad),
      idcentralizadormes:String(this.idmespuntoventasuma)
    };
    
    this.jsonDatosArray.push(jsontalonario);//AQUI ESTA MIS DATOS DE LA TABLA EN FORMATO JSON
   // console.log("tamanio matriz sin null",matrizFiltrada.length)
   //map()
   for (const fila of matriz) {
    
     if (fila[0] !== null ) {
     
      switch (fila[1]) {
        case 'A':
        case 'a':
          console.log("entra a A??", fila[1], this.estado);
          this.estado = 1;
          fila[1]=0;
          break;
        case 'E':
        case 'e':
          console.log("entra a E??", fila[1]);
          this.estado = 2;
          fila[1]=0;
          break;
        case 'I':
        case 'i':
          console.log("entra a I??", fila[1]);
          this.estado = 3;
          fila[1]=0;
          break;
        default:
          this.estado=0;
          break;
      }
      //this.jsonDatossumasArray=[];
      const jsonsumatalonario ={
        idsumatalonario:uuidv4(),
        numfactura: Number(fila[0]),
        monto: Number(fila[1]),
        estado: Number(this.estado),
        idventatalonario:String(iduuid),
       
      }
       this.jsonDatossumasArray.push(jsonsumatalonario)
    }
   
  }
  const jsondatosTodo ={
       arraytalonario: this.jsonDatosArray,
       arraysumatalonario: this.jsonDatossumasArray
  }
  this.jsonDatosArray=[];
  this.jsonDatossumasArray=[];
  this.arrayTabla.push(jsondatosTodo);
 
    
   this.valorsuma={};
   this.rango=0
   //this.factfinal=0;
   //this.factinicial=0;
   this.montodinamico=0; 
   
   //await this.ventastalonarioService.createVentatalonario(this.jsonDatosArray);
   //await this.sumatalonarioService.createSumatalonario(this.jsonDatossumasArray);
}
console.log("AQUI DEBEWRIA ESTAR TODOS MISA DATOS PARA RECORRER",this.arrayTabla);
//this.guardarTalonarioslocalstorage(this.arrayTabla);

//this.guardarTalonarios(this.arrayTabla);//con esto guarda en la db
  }
  guardarTalonarioslocalstorage(arrayTalonarios:any){
    //falta guardar localstorage
  
}


async guardarTalonarios(arrayTalonarios:any){
  //aqui hay este 
  console.log("aquie sta mis cosas", this.idventatalonario)
 
 
  if(this.idventatalonario){
    console.log("este  si tiene datos");
  const source$ = this.ventastalonarioService.getventaactividadbusqueda(this.idventatalonario); //con esto traigo el id
  const data:any = await lastValueFrom(source$);
  console.log("mis datos data",data)
  const resultado = data.find((item: any) => item.idventatalonario === this.idventatalonario); //buiscando si hay datos en mi tabla
  console.log("resultado",resultado);

 //exisate este dato?????
   arrayTalonarios.forEach(async (json :any) => {
    if(!resultado){
      //no hay datos, creamos
       
      await this.crearTalonarios(json.arraytalonario,json.arraysumatalonario);

    }else{
      //si hay datos, borramos y creamos
      await this.ventastalonarioService.deleteVentatalonario(this.idventatalonario);
      await this.crearTalonarios(json.arraytalonario,json.arraysumatalonario);
      //await this.ventastalonarioService.createVentatalonario(json.arraytalonario);
      //await this.sumatalonarioService.createSumatalonario(json.arraysumatalonario);
    }
    console.log("aqui tendria que estar mi talonario",json.arraytalonario); //aqui ahcer el await
    console.log("aqui tendria que estar mis sumas???",json.arraysumatalonario); 
    
});
}else{
   // await this.crearTalonarios(arraytalonario,arraysumatalonario);
    console.log("este no tiene datos..creamos");
    arrayTalonarios.forEach(async (json :any) => {
        await this.crearTalonarios(json.arraytalonario,json.arraysumatalonario);   
  });
   
}
}
async crearTalonarios(arraytalonario:any,arraysumatalonario:any){
  await this.ventastalonarioService.createVentatalonario(arraytalonario);
  await this.sumatalonarioService.createSumatalonario(arraysumatalonario);
  
}









anulacionChange(iduuid:string){
  const tabla = this.tablas.find((tabla:any) => tabla.iduuid === iduuid);
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
  