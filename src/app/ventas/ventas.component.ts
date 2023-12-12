import { Component, Input } from '@angular/core';
import { ModalserviceService } from '../services/modalservice.service';
import { ModalObservacionesContentComponent } from '../modal-observaciones-content/modal-observaciones-content.component';
import { PuntoventaService } from '../services/puntoventa.service';
import { LocalStorageService } from '../services/local-storage.service';
import { error } from 'jquery';
import { Puntoventa } from '../models/puntoventa.model';
import { MespuntoventasumaService } from '../services/mespuntoventasuma.service';
import { lastValueFrom, take } from 'rxjs';
import { mespuntoventasuma } from '../models/mespuntoventasuma.model';
import { v4 as uuidv4 } from 'uuid';
import { PuntoventaactividadService } from '../services/puntoventaactividad.service';
import { ventactividad } from '../models/ventaactividad.model';
import { SumatalonarioService } from '../services/sumatalonario.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  
  @Input() parametroDelPadreidcentralizadormes: string='';


  
  idempresaglobal:number=0;
  puntoventa: Puntoventa[]=[];
  puntoventa2:mespuntoventasuma[] = [];
  jsonarraypuntoventa:any = [];
  idpuntoventaactividad:any[]=[];
  puntoventa3:any[]=[];
  puntoventa4:ventactividad[]=[];
 
  datosTabla: any[] = [];
 numeroformularios: number=0;
   
  constructor(private modalService:ModalserviceService,
              private puntoventaService: PuntoventaService,  
              private dblocal: LocalStorageService ,
              private mespuntoventasumaService: MespuntoventasumaService, 
              private puntoventaactividadService: PuntoventaactividadService,  
              public sumatalonarioService: SumatalonarioService,
              
    ) { }


  ngOnInit(){
    console.log("holos mi id emeprsa???",this.dblocal.GetDatosEmpresa().idempresa);
    this.idempresaglobal=Number(this.dblocal.GetDatosEmpresa().idempresa);
    this.mespuntoventasuma();
    this.getPuntoVentaactividad();
  }

  

 async getPuntoVentaactividad(){
    ///traigo los iddemi tabla idpuntoventaactividad para crear y poner a mi tabla mes ventasuma
    await this.puntoventaactividadService.getPuntoventaactividad(this.idempresaglobal)
  .subscribe(
     (data: any) => {
      this.idpuntoventaactividad=data; //aqui estan los id de la tabla actividad para introducir a la tabla mesventasuma 
      if(data ===null){
        //esta vacio SIGNIFICA QUE HAY QUE CREAR ACTIVIDADES PARA ESA EMPRESA NO TIENE
        console.log("NO TIENE ACTIVIDADES....");
      }else{
        //traemos ...aqui introduciria a la tabla y jalamos 
        console.log("TIENE ACTIVIDADES....INTRODUCIMOS Y JALAMOS");
              this.traerdatos();   
        //primero traemos todo
        
        
      }
         
         console.log("es el  dataaaaaaaaaaaaaaaa", data);
         console.log("es el modelo del dataaaaaaaaaaaaaa", this.idpuntoventaactividad);
         
      
    }
    
   );
    
  }
  async traerdatos(){
    await this.dblocal.traerventasTodolocalstorage(this.idempresaglobal,this.parametroDelPadreidcentralizadormes)
   
   this.puntoventa3= this.dblocal.GetVentasTodo();
    console.log("actualizar mi local storaregeeeeeee PUNTOVENTA3333", this.puntoventa3)

  }

  async manejarActualizacion(datosActualizadosTalonariosTipo1: any[]) {                       //aqui actualiza mis datos del hijo al padreeee

       // await this.dblocal.guardarsumasventaslocalstorage(datosActualizadosTalonariosTipo1)
    console.log("ESTO PODRIA HACER O SERVIRMEMEEEEEEEE?????",datosActualizadosTalonariosTipo1)
    const idpuntoventaactividad=datosActualizadosTalonariosTipo1[0].idpuntoventaactividad;
  
    console.log("sapodkaspodkaspodkaposdasdkpaoskdpoappooooooo0000000000",idpuntoventaactividad)
    let datos= this.dblocal.GetVentasTodo();
   
    let elementoEncontrado = datos.find(puntoVenta => 
      puntoVenta?.puntoventaactividads.some((actividad:any) =>  actividad.idpuntoventaactividad === idpuntoventaactividad)
       
      
    );
    for (let i = 0; i < this.dblocal.GetVentasTodo().length; i++) {
      const puntoVenta = this.dblocal.GetVentasTodo()[i];
      console.log("ppppppppppppp----------------------ooooooooooooooooooooo--",this.dblocal.GetVentasTodo()[i].puntoventaactividads[0].ventatalonariostipo1)
      if (puntoVenta?.puntoventaactividads.some((actividad: any) => actividad.idpuntoventaactividad === idpuntoventaactividad)) {
        this.dblocal.GetVentasTodo()[i].puntoventaactividads[0].ventatalonariostipo1=datosActualizadosTalonariosTipo1
        break;
      }
    }
    
   
  

    if (elementoEncontrado) {
      console.log('Elemento encontrado:', elementoEncontrado);
      console.log("sapodkaspodkaspodkaposdasdkpaoskdpoappooooooo0000000000------------",elementoEncontrado?.puntoventaactividads[0]?.ventatalonariostipo1)
      // elementoEncontrado?.puntoventaactividads[0]?.ventatalonariostipo1 = datosActualizadosTalonariosTipo1
       elementoEncontrado.puntoventaactividads[0].ventatalonariostipo1=datosActualizadosTalonariosTipo1
       console.log('Elemento encontrado DEPSUES DE CAMBIO:', elementoEncontrado);
       console.log('Elemento encontrado DEPSUES DE CAMBIOOOOOOOOOOO:', datos);
       //this.dblocal.guardarsumasventasTodolocalstorage(datos);
    } else {
      console.log('Elemento no encontrado');
    }

    console.log('Datos actualizados en el componente padre:', datosActualizadosTalonariosTipo1);//trae los datos actualizados me faltaria setear no mas creo  pero tendria que buscar por??
    
    // Realiza acciones adicionales según tus necesidades
  }

  observaciones(){
     this.callObservaciones(this.parametroDelPadreidcentralizadormes);
  }

  callObservaciones(idcentralizadormes:string){
    const data={
    header: 'Observaciones ',
    width: '35%',
    height: '60%',
    data:{
      idcentralizadormes
    }
  }
  this.modalService.openModal(data, ModalObservacionesContentComponent);
}


async mespuntoventasuma(){
    
  //this.mespuntoventasumaService.createmespuntoventasuma(this.idcentralizadormes);

console.log("HOLSOOOOOOOOOOOOOOOOOOOOOOOOOO ES EL MI idempresaaa",this.idempresaglobal)
const source$ = this.puntoventaactividadService.getPuntoventaactividad(this.idempresaglobal); //con esto traigo el id
const data:any = await lastValueFrom(source$);
console.log("mis datos data de mespuntiventasumaAAAAA",data)



if(data.length !=0){ 
      console.log("HOLOS HAaaaaY DATOS"); //mostramos
    this.puntoventa2=data;
    console.log("aquiest ami puntoventaaaasuma",this.puntoventa2);
    console.log("mi prueba de que esta dando o no mis datos GATO PATOOO", this.puntoventa2[0].puntoventa?.nombre);
}else{
  this.jsonarraypuntoventa=[];
    console.log("HOLOS NO HAaaaaY DATOS"); //creamos
    const source$ = this.puntoventaService.getPuntoVenta(this.idempresaglobal);
    const data:any = await lastValueFrom(source$);
    for (const item of data) {
      const idpuntoventa = item.idpuntoventa;
      const jsonpuntoventa ={
      idmespuntoventasuma: uuidv4(),
      idcentralizadormes:  this.parametroDelPadreidcentralizadormes,
      idpuntoventa: idpuntoventa 
      }
      this.jsonarraypuntoventa.push(jsonpuntoventa);
    }
   this.puntoventa2=[];
    await this.mespuntoventasumaService.createMespuntoventa(this.jsonarraypuntoventa);
    const sources$ = this.mespuntoventasumaService.getmespuntoventasuma(this.parametroDelPadreidcentralizadormes); //con esto traigo el id
    const dataa:any = await lastValueFrom(sources$);
    this.puntoventa2=dataa;
   
    console.log("este es mi JSONARRAY PARA MANADAR ",this.jsonarraypuntoventa);
    //const resultado = data.find((item: any) => item.idempresa === this.idempresaglobal); //buiscando si hay datos en mi tabla
    //console.log("resultadodemi busqueda en puntoventa",resultado);
    //await this.comprassumasdetalleService.postComprasumadetalles(this.jsonComprassArray);
    //this.jsonComprassArray=[];
  }



}

calcularPosicion(indexInterior: number, indexExterior: number): number {
  const cantidadActividadesPorSucursal = this.puntoventa3[0].data.length;
  return indexExterior * cantidadActividadesPorSucursal + indexInterior;
}

  }

  



