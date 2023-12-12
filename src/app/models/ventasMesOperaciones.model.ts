import { LocalStorageService } from "../services/local-storage.service";
import { TalonarioLogico } from "./tablatalonariologico.model";
import { HotTableRegisterer } from '@handsontable/angular';
import { Inject, Injectable } from '@angular/core';
import { stringify } from "handsontable/helpers";
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class VentasMesOperaciones{

    //private localDb= Inject(LocalStorageService)
    
    
   // datosTabla:any = [];
 
    constructor(
        private localDb: LocalStorageService,
      // private hotRegisterer: HotTableRegisterer
        ){  
       
       //      this.datosTabla=  this.localDb.GetVentas(); 
          
        }
    agregarTalonario(idpuntoactividad:string, idmes:string,hotRegisterer:any){
        
            let talonarionuevo = new TalonarioLogico(hotRegisterer);
            talonarionuevo.factfinal=0;
            talonarionuevo.factinicial =0;
            talonarionuevo.idventatalonario= talonarionuevo.iduuid;
            talonarionuevo.idcentralizadormes = idmes;
            talonarionuevo.idpuntoventaactividad = idpuntoactividad;
            talonarionuevo.sumatalonarios = talonarionuevo.hotSettings.data;
           // talonarionuevo.sumatalonarios.id=
           // talonarionuevo.sumatalonarios.i = talonarionuevo.hotSettings.data;
         
            console.log("AQUI TENDIR AUE ESTAR MI NUEVO??????", talonarionuevo) 
            return talonarionuevo
           
           
          
    }
    transformarTalonario(arrayTalonarios:any,hotRegisterer:any){
      console.log(arrayTalonarios,"aqui hay algooogogoasasasasasgogogo")
      let arrayDeInstancias: any[] = arrayTalonarios.map((json:any) => {

        let talonarioInstancia = new TalonarioLogico(hotRegisterer);
        
    
        
        talonarioInstancia.idventatalonario = json.idventatalonario;
        talonarioInstancia.idcentralizadormes = json.idcentralizadormes;
        talonarioInstancia.idpuntoventaactividad = json.idpuntoventaactividad;
       
        talonarioInstancia.factinicial = json.factinicial;
        talonarioInstancia.factfinal = json.factfinal;
        talonarioInstancia.sumatalonarios = json.sumatalonarios;
        talonarioInstancia.hotSettings.data = json.sumatalonarios;
        //talonarioInstancia.suma = json.montototal;
        //talonarioInstancia.hotSettings.iduuid = json.idventatalonario;
       


       
       
        
        return talonarioInstancia;
      })

      console.log(arrayDeInstancias,"aqui hay MI ARRRAAAAAAAAAAAAAAAAAAAAAAAAAAAY")
    return arrayDeInstancias

    }
    setNTalonario(idventatalonario:string,numerotalonario:number){
           
          /*let talonario = this.datosTabla.find((item:TalonarioLogico) =>{
            return item.idventatalonario = idventatalonario
          })
          if(talonario){
             talonario.numtalonario = numerotalonario
              }
    */
            }
    

    borrar(id:string,numerotalonario:number){
    }
    actualizar(){

    }
  
}