import { LocalStorageService } from "../services/local-storage.service";
import { TalonarioLogico } from "./tablatalonariologico.model";
import { HotTableRegisterer } from '@handsontable/angular';
import { Inject, Injectable, NgModule } from '@angular/core';
import { stringify } from "handsontable/helpers";
import { v4 as uuidv4 } from 'uuid';
import { sumatalonario } from "./sumatalonario";
import { LocaleService } from "ag-grid-community";
import { HandsonTable } from "./handsontable.model";
/*
class VentaStorage{
  
}*/

@Injectable({
  providedIn: 'root'
})

export class VentasMesOperaciones{
  private datos:any=[];
  //private ventasLocalstorage?:VentaStorage;
  static ventasMesOperaciones?:VentasMesOperaciones;//=new VentasMesOperaciones(new VentaStorage());
   //ventas:any;
   public static getInstance(){
    if(VentasMesOperaciones.ventasMesOperaciones)
      return VentasMesOperaciones.ventasMesOperaciones;
    else
      return VentasMesOperaciones.ventasMesOperaciones =new VentasMesOperaciones();
    
   }
  setDatosLocalStorage(dato:any){
    if(VentasMesOperaciones.ventasMesOperaciones)
      VentasMesOperaciones.ventasMesOperaciones.datos = dato;
  } 
    private constructor(){
      //this.ventas = ventasLocalstorage;
    }
///////punto venta         
    public getPuntoVentas():[any]{
      return VentasMesOperaciones.ventasMesOperaciones?.datos??[];
    }

    public getPuntoVentaFromActividad(item:any){      //este busca la actividad la posicion
      let index= -1
      let array_:any = this.getPuntoVentas(); //este es mi array 
      for(let i=0;i<array_.length;i++){
          let pos = array_[i].puntoventaactividads.indexOf(item); //aqui estyoy buscando el posicion actividad 
          if(pos >= 0){
            index = pos;
            break; 
          }
      }
      return array_[index];
    }


    agregarTalonario(actividad:any, idmes:string,tipo:number){
            let talonarionuevo = new TalonarioLogico();
            talonarionuevo.tipo = tipo;
            talonarionuevo.factfinal=0;
            talonarionuevo.factinicial =0;
           // talonarionuevo.idventatalonario= talonarionuevo.iduuid;
            talonarionuevo.idcentralizadormes = idmes;
            //talonarionuevo.idpuntoventaactividad = idpuntoactividad;
          //  talonarionuevo.sumatalonarios[0] = idpuntoactividad;
            //talonarionuevo.sumatalonarios = talonarionuevo.hotSettings.data;
           // talonarionuevo.sumatalonarios.id=
          //  talonarionuevo.sumatalonarios = talonarionuevo.handsontable.hotSettings.data;
          let  handsontable = new HandsonTable(talonarionuevo);
          let  puntoVenta = this.getPuntoVentaFromActividad(actividad) //esto tendria que mandar para que3 vuelava a buscarmelo donde va a insertar 
          console.log("++++++++++++/////+++++",puntoVenta)
           puntoVenta.puntoventaactividads[0].ventatalonariostipo1.push(handsontable); //aqui le dice en que posicion le insertara
           console.log("fin de todos mis datos",puntoVenta)
            return talonarionuevo
           

           
          
    }
    transformarTalonario(arrayTalonarios:any){
      console.log(arrayTalonarios,"aqui hay algooogogoasasasasasgogogo")
      let arrayDeInstancias: any[] = arrayTalonarios.map((json:any) => {

        let talonarioInstancia = new TalonarioLogico();
        
    
        
        talonarioInstancia.idventatalonario = json.idventatalonario;
        talonarioInstancia.idcentralizadormes = json.idcentralizadormes;
        talonarioInstancia.idpuntoventaactividad = json.idpuntoventaactividad;
        talonarioInstancia.tipo= json.tipo;
        talonarioInstancia.factinicial = json.factinicial;
        talonarioInstancia.factfinal = json.factfinal;
        //talonarioInstancia.sumatalonarios = json.sumatalonarios;
       // talonarioInstancia.hotSettings.data = json.sumatalonarios;
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
              VentasMesOperaciones.ventasMesOperaciones?.datos??[];
            }
    

   
    

    async agregarValorTalonario(idsumatalonario:string ,numfactura:number,monto:number,idventatalonario:any){
    
      let sumatalonarios = new sumatalonario();
      sumatalonarios.idsumatalonario=idsumatalonario
      sumatalonarios.monto=monto
      sumatalonarios.numfactura=numfactura
      sumatalonarios.idventatalonario=idventatalonario
      console.log("ESTA LLEGANDO TOSOOSDOSODSOD9999", sumatalonarios)
     // this.searchAndGetValorTalonario(sumatalonarios,idventatalonario)  //de aqui ahcer algo 
     let datosTalonario = await this.searchValorTalonario(idventatalonario) 
     console.log("AQUI TENDRIA QUE HACER UN PUSHHHHHHHHH",datosTalonario)
     datosTalonario.sumatalonarios.push(sumatalonarios)         
     let holos =this.getPuntoVentas()
     console.log("toooooooooooooo revisar datos",holos)
    }


   async  searchValorTalonario(idventatalonario:string){      //este busca la actividad la posicion de donde colocar el tlaonario segun el idcentatalonario
    let array_: any = this.getPuntoVentas();
  let objetoEncontrado: any = null;

  for (let i = 0; i < array_.length; i++) {
    let objetoExterno = array_[i];

    for (let j = 0; j < objetoExterno.puntoventaactividads.length; j++) {
      let objetoMedio = objetoExterno.puntoventaactividads[j];

      for (let k = 0; k < objetoMedio.ventatalonariostipo1.length; k++) {
        let objetoInterno = objetoMedio.ventatalonariostipo1[k];

        if (objetoInterno.talonarioLogico.idventatalonario === idventatalonario) {
          objetoEncontrado = objetoInterno.talonarioLogico;
          console.log("se encontró", objetoEncontrado);
          return objetoEncontrado;
        }
      }
    }
  }

  return objetoEncontrado;
      
    }

    async updateValorTalonario(filaActualizar:any){
      console.log("entra a mi actualizacion", filaActualizar)
      let idventatalonario = filaActualizar.idventatalonario;
      let idsumatalonario = filaActualizar.idsumatalonario;
      let valor = filaActualizar.monto;

      let valorencontrado= await this.searchValorTalonario(idventatalonario);
      console.log("entra a mi asdasdadasdasdasdasd", valorencontrado)
   
      let miArray= valorencontrado.sumatalonarios;
      for (let i = 0; i < miArray.length; i++) {
        if (miArray[i].idsumatalonario === idsumatalonario ) {
          console.log("mi ID SUMATALONARIOOOOOOO", idsumatalonario)
          console.log("entra a mi asdasdadasdasdasdasd PARA CAMBIAR ENVONTROOOOOO", miArray[i].idsumatalonario)
          miArray[i].monto = valor;
          break;
        }
      }
      console.log("mi array cambiado",miArray)

      let array_: any = this.getPuntoVentas();
      console.log("CAMBIOOOOOOOOOOOOOO999",array_)
   
    }

    async deleteValorTalonario(idsumatalonario:any ,idventatalonario:any){
     
     // let idventatalonario = filaEliminada.idventatalonario;
     // let idsumatalonario = filaEliminada.idsumatalonario;
      
     
      let valorencontrado= await this.searchValorTalonario(idventatalonario);
       let miArray= valorencontrado.sumatalonarios;
       console.log("este seria mi nuevo array?? que eliminar 787878787", miArray )
      let nuevoarary =  miArray.filter((objeto:any) => objeto.idsumatalonario !== idsumatalonario);
      console.log("mi nuevo array", nuevoarary)
       // console.log("este seria mi nuevo array?? que eliminar 787878787", nuevoArray )
      //sumatalonarios.idsumatalonario=idsumatalonario
     
               
    
      
    }

   
  
}  