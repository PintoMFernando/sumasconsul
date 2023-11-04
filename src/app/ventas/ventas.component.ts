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
 
 

   
  constructor(private modalService:ModalserviceService,
              private puntoventaService: PuntoventaService,  
              private dblocal: LocalStorageService ,
              private mespuntoventasumaService: MespuntoventasumaService,   
    ) { }


  ngOnInit(){
    this.mespuntoventasuma();
    console.log("holos mi id emeprsa???",this.dblocal.GetDatosEmpresa().idempresa);
    this.idempresaglobal=Number(this.dblocal.GetDatosEmpresa().idempresa);
    
    this.getPuntoVenta();
  }

  getPuntoVenta(){
    ///de aqui tengo que jalar las sucursales 
  this.puntoventaService.getPuntoVenta(this.idempresaglobal)
  .subscribe(
    (data: any) => {
      this.puntoventa=data;
         console.log("es el  data", data);
         console.log("es el modelo del data", this.puntoventa);
         console.log("es el  data nombre", data[0].nombre);
      
    }
    
   );
    
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

console.log("HOLSOOOOOOOOOOOOOOOOOOOOOOOOOO ES EL MI idcentralizadormes",this.parametroDelPadreidcentralizadormes)
const source$ = this.mespuntoventasumaService.getmespuntoventasuma(this.parametroDelPadreidcentralizadormes); //con esto traigo el id
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

  }

  



