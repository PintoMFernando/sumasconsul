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
     
    const source$ =this.puntoventaactividadService.getPuntoventaactividad(this.idempresaglobal);
    const data:any = await lastValueFrom(source$);
    this.puntoventa3=data;
    
    console.log("mis datos data de aslkdjhasidhbasjkdnlaskdas",data.data)
    console.log("mis datos data de mi this4",this.puntoventa3)

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

  



