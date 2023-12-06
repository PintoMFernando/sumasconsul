import { LocalStorageService } from "../services/local-storage.service";
import { TalonarioLogico } from "./tablatalonariologico.model";


export class VentasMesOperaciones{
    
    datosTabla:any = [];
       
    constructor(
        private localDb: LocalStorageService
        
        ){  
       
            this.datosTabla=this.localDb.SetVentas
        }
    agregarTalonario(idpuntoactividad:string, idmes:string){
            let talonarionuevo = new TalonarioLogico;
            talonarionuevo.factfinal=1;
           this.datosTabla[0].push( talonarionuevo)
    }
    borrar(){
    }
    actualizar(){

    }
          
}