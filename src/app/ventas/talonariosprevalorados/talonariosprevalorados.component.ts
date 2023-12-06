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
    
   
    ) {// this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado = [];  
    }          
   //numberOfForms: number = 0;
   numberOfForms: any [] = [];
   formArray: FormGroup[] = [];
   hotSettingsArray: any[] =[]; //esto contiene todas mis isntancias de handsontable
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
   
   factinicial: number[]=[];
   factfinal: number[]=[];
   montodinamico: number=0;
   agregarFilas: boolean[] = [];
   //idtalonario = 'hotInstance';
   
   rango: number=0;
  
   numerotalonario: number =0;
   postArray: any[] =[];
   
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
      const datosEspecificos = {
        idpuntoventaactividad:this.idpuntoventaactividad,
        idmes:this.idmespuntoventasuma,
        tipo:2,
        talonario:[]
      
      };
       const existente = this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado.find((item:any) => //esto controla que no se repita datos en mi matriz 
        item.idposicion.idpuntoventaactividad === this.idpuntoventaactividad &&
        item.idposicion.idmes === this.idmespuntoventasuma
      );
      
      if (!existente) {    // Si no existe, agregar un nuevo objeto
        this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado.push({
          idposicion: datosEspecificos,
        });
      } else {
        // Si existe
       
      }

      this.posicionpuntoventa = this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado.find((item:any) => item.idposicion.idmes === this.idmespuntoventasuma && item.idposicion.idpuntoventaactividad === this.idpuntoventaactividad);
      
      console.log("que hay aquiiiiiiiiiesataaasd-----------------------------ES MI POSICION ",this.posicionpuntoventa) //este es mi posicion donde me encuentro

       this.traerlocalstorage();
       


    }
  
   

    async traerlocalstorage(){
      const source$ = this.sumatalonarioService.getTalonariosuma(String(this.idmespuntoventasuma),2); //con esto traigo el id
      const data:any = await lastValueFrom(source$);
      console.log("esteeeeeeeeeeeeeee e smi data",data)
      await this.dbLocal.SetVentas(data);
      await this.traertablasventas();
    }
      async traertablasventas(){
    
   // const source$ = this.sumatalonarioService.getTalonariosuma(String(this.idmespuntoventasuma)); //con esto traigo el id
   // const data:any = await lastValueFrom(source$);
    let datosdecompras=this.dbLocal.GetVentas()
    
    this.datosTabla = datosdecompras;
   // this.datosTabla = data;
    console.log("MIS DATOS TABLA",this.datosTabla)
    
    console.log("MIS DATOS TABLA tamaniooooo",this.datosTabla.length)
   
   
    for( let i=0; i< this.datosTabla.length;i++){
   
    //this.conteotalonarios=0;
      for( let j=0; j< this.datosTabla[i].length;j++){
        console.log("aqui hay algooooo", this.datosTabla[i][j].idpuntoventaactividad);
      if( this.idpuntoventaactividad === this.datosTabla[i][j].idpuntoventaactividad && this.idmespuntoventasuma === this.datosTabla[i][j].idcentralizadormes){
         //estoy apartando segun idactividad y mes, para poner a cada input su propio valor ya que estoy traendo varios datos de una y tengo que separar   
         this.conteotalonarios++;
         this.idventatalonario= this.datosTabla[i][j].idventatalonario
        this.factinicial[j]= this.datosTabla[i][j].factinicial;
        this.factfinal[j]= this.datosTabla[i][j].factfinal;
             
      }
      console.log("MI FACTURA INICIAL", this.factinicial[j]);
     console.log("MI FACTURA FINAL", this.factfinal[j]);
    }
    
     console.log("que hay aquiiiiii", this.conteotalonarios)
  }

  this.numberOfForms[this.index]=this.conteotalonarios
  console.log("CONTEOOOOOOOOOOOOOOOOOOOOOOOOOOOO", this.conteotalonarios);
  await this.onNumberOfFormsChange();
    // if(this.idpuntoventaactividad == data.idpuntoactividad && this.parametroDelPadreidcentralizadormes === data.idcentralizadormes){
    //}
   
   
       
   }


    
  
    async onNumberOfFormsChange() {
      await this.actualizarFormularios();
    }
    private actualizarFormularios() {
   
      //const cantidadFormularios = this.numberOfForms;
      //this.crearFormularios(cantidadFormularios );
      const cantidadFormularios = this.numberOfForms[this.index];
      const formulariosActuales = this.posicionpuntoventa.idposicion?.talonario?.length;
      const ultimoValor = this.posicionpuntoventa.idposicion?.talonario?.length-1; 
      
      
      
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

  
   
  
    private crearFormularios(cantidad: number,valoaumentar:number) {
      //if(this.hotRegisterer.getInstance('talonario'+index).getData()) ==)
      //this.hotSettingsArray =[];
      console.log("entra a crear fomulariooooooooooooooooooos",cantidad,valoaumentar)
      console.log("mnis cosas para verificar",this.idmespuntoventasuma ,this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado)
      console.log("mnis cosas para verificar222222",this.idpuntoventaactividad ,this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado)
    
      for ( let i = valoaumentar; i < cantidad; i++) {
       // const objetoEncontrado = this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado.find((item:any) => item.idposicion.idmes === this.idmespuntoventasuma && item.idposicion.idpuntoventaactividad === this.idpuntoventaactividad);
        //console.log("OBJETO ENCONTRADOODAOOSDOADAOSDASODAOS",objetoEncontrado)
        //if(objetoEncontrado){
          //console.log("OBJETO ENCONTRADOODAOOSDOADAOSDASODAOShay datooos ",objetoEncontrado)
          const tablatalonariosprevalorados : FormularioPrevalorado = new FormularioPrevalorado(this.hotRegisterer);
          this.posicionpuntoventa.idposicion?.talonario?.push(tablatalonariosprevalorados)
          
          console.log("ESTO TENGO QUE ITERARAA WACHIIIN",this.posicionpuntoventa)
          //console.log("sea gregoooooooo se agregaron cosas",this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado)
       // }
      
       //ya tengo mis datos, cuando creee que ya tengo su id y cada vez que cree, 
       
        //this.hotSettingsArray.push(hotSettings);

    
        
  
  
          
        //console.log("AQUI TENDRIA QUE PONER MIS DATAS EN UN FOR O ALGO", this.hotSettingsArray[0].data)
      }
       this.tablas =  this.posicionpuntoventa.idposicion?.talonario;

       console.log("MIS TABLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS", this.tablas)
      for( let i=0; i< this.datosTabla.length;i++){
        for( let j=0; j< this.datosTabla[i].length;j++){
        if( this.idpuntoventaactividad === this.datosTabla[i][j].idpuntoventaactividad && this.idmespuntoventasuma === this.datosTabla[i][j].idcentralizadormes){
         
          this.hotSettingsArray[j].data = this.datosTabla[i][j].sumaventatalonario;
          console.log("AQUI ESTA MI DONDE ESTARIA TODOooooooooooo????",i,  this.hotSettingsArray[i].data)   
        }
        
      }
  
    }
  
      console.log("AQUI ESTA MI ARRAY", this.hotSettingsArray)
      
     
      console.log("AQUI ESTA EL TAMANIO DE MI ARRAY", this.hotSettingsArray.length)
      console.log("AQUI ESTA MI CANTIDAD", cantidad)
    }
 
   async guardar(index:number){
    console.log("MIS TABLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS", this.tablas)
    console.log("aquie esta mi matriz completaaaaaaa",   this.matrizventaService.matrizLocalstorageidventatalonarioprevalorado)
   }

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



anulacionChange(index:number){
   //nos quedamos aqui
   console.log("que aprametro llega?????",index)
   console.log("que aprametro llegaeqweqweqw?????",this.index)
  
   if(this.agregarFilas[index]==true){
   this.agregarFilas[index]=false;
   this.rango = this.factfinal[index]-this.factinicial[index];
   console.log("aqui estan mi rango",this.rango);
  for (var i=0; i<= this.rango; i++) {

    const fact=this.factinicial[index];
    this.hotRegisterer.getInstance(this.index).alter('insert_row_below');   //esto crea las columnas que yo quiera
    this.hotRegisterer.getInstance(this.index).setDataAtCell(i,0,this.factinicial[index]);
    this.hotRegisterer.getInstance(this.index).setDataAtCell(i,1,this.montodinamico);//aqui pone los datos en la casillas
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
  