import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { Fecha } from '../infraestructura/fecha';

@Injectable({
  providedIn: 'root'
})
export class CalculocentralizadormesService {

  constructor(private http:  HttpClient) {}
   private baseUrl = environment.url;
   private headers = { 'Content-Type': 'application/json' };




   /*getpatchClculoscentralizadormes(idcentralizadormes:string,mes:number,idempresa:number,anio:number): Observable<any> {
    const mess= 1 
    console.log("holso smis cosas",idcentralizadormes,mes,idempresa,anio, mess)
    return this.http.get<any>(`${this.baseUrl}/centralizadormes/calculos/${idcentralizadormes}/${mess}/${idempresa}/${anio}`);
    
  }*/


  async getpatchClculoscentralizadormes(idcentralizadormes:string,mes:string,idempresa:number,anio:number){
    const mimes = Fecha.getNumeroMes(mes);
   
    
    try{
     return  await firstValueFrom(this.http.get(`${this.baseUrl}/centralizadormes/calculos/${idcentralizadormes}/${mimes}/${idempresa}/${anio}` ))
    }catch(e){
      return e
    }
  
  
  }

  async getpatchClculoscentralizadormescompras(idcentralizadormes:string){
    
   
    
    try{
     return  await firstValueFrom(this.http.get(`${this.baseUrl}/centralizadormes/calculoscompras/${idcentralizadormes}` ))
    }catch(e){
      return e
    }
  
  
  }

  async getpatchClculoscentralizadormescomprasiva(idcentralizadormes:string,mes:string,anioactual2:number,id_empresa:number){
    const mimes = Fecha.getNumeroMes(mes);
   
    
    try{
     return  await firstValueFrom(this.http.get(`${this.baseUrl}/centralizadormes/calculosiva/${idcentralizadormes}/${mimes}/${anioactual2}/${id_empresa}` ))
    }catch(e){
      return e
    }
  
  
  }

  async getpatchClculoscentralizadormescomprasiue(idcentralizadormes:string,saldoiue:number,mes:string,anioactual2:number,id_empresa:number){
    const mimes = Fecha.getNumeroMes(mes);
   
    console.log("entra al servicio",idcentralizadormes,mimes,mes,id_empresa,anioactual2)
    try{
     return  await firstValueFrom(this.http.get(`${this.baseUrl}/centralizadormes/calculositsaldoiue/${idcentralizadormes}/${saldoiue}/${mimes}/${anioactual2}/${id_empresa}` ))
    }catch(e){
      return e
    }
  
  
  }



  async getpatchClculoscentralizadormescomprasit(idcentralizadormes:string){
    
   
    
    try{
     return  await firstValueFrom(this.http.get(`${this.baseUrl}/centralizadormes/calculosit/${idcentralizadormes}` ))
    }catch(e){
      return e
    }
  
  
  }


  async getpatchClculoscentralizadormesotros(idcentralizadormes:string){
    
   
    
    try{
     return  await firstValueFrom(this.http.get(`${this.baseUrl}/centralizadormes/calculoscentralizadormesotros/${idcentralizadormes}` ))
    }catch(e){
      return e
    }
  
  
  }

  async getpatchClculoscentralizadormestotal(idcentralizadormes:string){
    
   
    
    try{
     return  await firstValueFrom(this.http.get(`${this.baseUrl}/centralizadormes/calculoscentralizadormestotal/${idcentralizadormes}` ))
    }catch(e){
      return e
    }
  
  
  }


  async getpatchClculoscentralizadormestotaltodo(idcentralizadormes:string){
    
   
    
    try{
     return  await firstValueFrom(this.http.get(`${this.baseUrl}/centralizadormes/calculoscentralizadormestotaltodo/${idcentralizadormes}` ))
    }catch(e){
      return e
    }
  
  
  }
  
  
  
  
  
  
  
  
  
  
  
  



 

  /*async getpatchClculoscentralizadormes(idcentralizadormes:string,mes:number,idempresa:number,anio:number){
    const mess= 1 
    console.log("entra al servicio",idcentralizadormes,mess,mes,idempresa,anio)
    return await this.http.get(`${this.baseUrl}/centralizadormes/calculos/${idcentralizadormes}/${mess}/${idempresa}/${anio}`);
    
   }*/


   

  getventaactividadbusqueda(idventaactividad:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/venatatalonario/busquedaventtalonario/${idventaactividad}`);
  
  }


  

}
