import { LocalStorageService } from "../services/local-storage.service";
import { TalonarioLogico } from "./tablatalonariologico.model";
import { HotTableRegisterer } from '@handsontable/angular';
import { Inject, Injectable, NgModule, inject } from '@angular/core';
import { stringify } from "handsontable/helpers";
import { v4 as uuidv4 } from 'uuid';
import { sumatalonario } from "./sumatalonario";
import { LocaleService } from "ag-grid-community";
import { PuntoactividadService } from "../services/puntoactividad.service";
import { ventataalonario } from "./ventatalonario";
import { TalonariosventasComponent } from "../ventas/talonariosventas/talonariosventas.component";


@Injectable({
  providedIn: 'root'
})

export class AgregarSumas{
  
   //private  dbLocal= inject(LocalStorageService)
   //private  ventascomp= inject(TalonariosventasComponent)

    constructor( 
       
        ){}

    

   async agregarValorTalonario(idsumatalonario:string ,monto:number,numfactura:number,idventatalonario:any){
      let sumatalonarios = new sumatalonario();
      sumatalonarios.idsumatalonario=idsumatalonario
      sumatalonarios.monto=monto
      sumatalonarios.numfactura=numfactura
      sumatalonarios.idventatalonario=idventatalonario
      

      //const holos = this.ventascomp.
     // let servicio = new PuntoactividadService();
     // const id =servicio.GetIdpuntoventaactividad();
     // let getventas = new PuntoactividadService();
     // const buscar =  getventas.GetVentas(id)


       
      //console.log("mi ideaaasq",id, "aqui es donde tengo que buscar??????", buscar)
     // console.log("ESTA LLEGANDO TOSOOSDOSODSOD9999", idsumatalonario ,monto,numfactura,idventatalonario)
               
     
      
    }
    SetValorTalonario(idsumatalonario:string ,monto:number,numfactura:number,idventatalonario:any){
      let sumatalonarios = new sumatalonario();
      sumatalonarios.idsumatalonario=idsumatalonario
      sumatalonarios.monto=monto
      sumatalonarios.numfactura=numfactura
      sumatalonarios.idventatalonario=idventatalonario
      console.log("ESTA LLEGANDO TOSOOSDOSODSOfsdfsdfsdfsdD", idsumatalonario ,monto,numfactura,idventatalonario)
   
    }
    deleteValorTalonario(idsumatalonario:string ){
      let sumatalonarios = new sumatalonario();
      sumatalonarios.idsumatalonario=idsumatalonario
     
               
    
      
    }
  
}  