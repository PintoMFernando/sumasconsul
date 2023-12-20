import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuntoactividadService {

  constructor() { }

  SetIdpuntoventaactividad(idpuntoventaactividad:any){
    localStorage.setItem("idpuntoventaactividad",JSON.stringify(idpuntoventaactividad));
  }
  GetIdpuntoventaactividad():any{
    if(localStorage.getItem("idpuntoventaactividad")){
      let idpuntoventaactividad = localStorage.getItem("idpuntoventaactividad")??'';
      return JSON.parse(idpuntoventaactividad);
    }
    else
    return [];
  }
 
  ClearIdpuntoventaactividad() {
    localStorage.removeItem("idpuntoventaactividad");
  }


  async idPuntoVentaActividad(idpuntoventaactividad:string){
    await this.ClearIdpuntoventaactividad();
    await this.SetIdpuntoventaactividad(idpuntoventaactividad);

  }






  SetVentas(ventas: any,id:string) {
    const serializedVentas = PuntoactividadService.serializeWithoutCircular2(ventas);
    const palabraBase = "ventas";
    const resultado =palabraBase+id ;
    localStorage.setItem(resultado, serializedVentas);
 
  }
  GetVentas(id:string):any[]{
    const palabraBase = "ventas";
    const resultado =palabraBase+id ;
    if(localStorage.getItem(resultado)){
      let ventas = localStorage.getItem(resultado)??'';
      return ventas ? JSON.parse(ventas) : [];
    }
    else
    return [];
  }
  StateVentas():boolean{
    
    return localStorage.getItem("ventas")!==null;
  }
  ClearVentas(id:string) {
    
    const palabraBase = "ventas";
    const resultado =palabraBase+id ;
    localStorage.removeItem(resultado);
  }



  static serializeWithoutCircular2(obj: any): string {
    const seen = new WeakSet();
  
    function replacer(key: string, value: any) {
      if (key === 'hotRegisterer' || key === 'hyperformulaInstance'|| key === 'hotSettings'|| key === 'comunicacionService') {
        return undefined; // Excluir propiedades específicas que puedan causar referencias circulares
      }
  
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return undefined; // Evitar referencias circulares
        }
        seen.add(value);
      }
  
      if (key === 'sumatalonarios' && Array.isArray(value)) {
        // Preservar las propiedades 'idventatalonario' y 'numfactura' en cada objeto de 'sumatalonarios'
        return value.map((item: any) => ({
          
          idsumatalonario: item.idsumatalonario, 
          numfactura: item.numfactura,
          monto: item.monto,
          idventatalonario: item.idventatalonario,
          estado: item.estado,

        }));
      }
  
      return value;
    }
  
    return JSON.stringify(obj, replacer);
  }



}
