import { LocalStorageService } from "../services/local-storage.service";
import { TalonarioLogico } from "./tablatalonariologico.model";

import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentasMesOperaciones{

    //private localDb= Inject(LocalStorageService)
    
    datosTabla:any = [];
 
    constructor(
        private localDb: LocalStorageService
        ){  
       
       //      this.datosTabla=  this.localDb.GetVentas(); 
          
        }
    agregarTalonario(idpuntoactividad:string, idmes:string){
        console.log("que hay en primeeeeeeeeeer lugar en mi array????", this.datosTabla)
            let talonarionuevo = new TalonarioLogico;
            talonarionuevo.factfinal=0;
            talonarionuevo.factinicial =0;
            talonarionuevo.idcentralizadormes = idmes;
            talonarionuevo.idpuntoventaactividad = idpuntoactividad;
            const existente = this.datosTabla.find((item:any) => //esto controla que no se repita datos en mi matriz 
            item.idpuntoventaactividad === idpuntoactividad &&
            item.idcentralizadormes === idmes
             );
           console.log("EXISTEEEEEEEEEEEEEEEEEEEEE", existente)
         


      
            if (!existente) {    // Si no existe, agregar un nuevo objeto
                console.log("no EXISTEEEEEEEEEEEEEEEEEEEEE ponemos nuevo dato al dfatosTABLAAA", existente)
                this.datosTabla[0].push(talonarionuevo)
              } else {
                // Si existe
               
              }
           // this.datosTabla.push(talonarionuevo)
    }
    setNTalonario(idventatalonario:string,numerotalonario:number){
          let talonario = this.datosTabla.find((item:TalonarioLogico) =>{
            return item.idventatalonario = idventatalonario
          })
          if(talonario){
             talonario.numtalonario = numerotalonario
          }
    }
    

    borrar(id:string,numerotalonario:number){
    }
    actualizar(){

    }
          
}