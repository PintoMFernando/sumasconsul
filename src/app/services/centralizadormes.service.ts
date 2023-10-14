import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Centralizadormes } from '../models/centralizadormes.model';

@Injectable({
  providedIn: 'root'
})
export class CentralizadormesService {
  

  private baseUrl = environment.url;
  private headers = { 'Content-Type': 'application/json' };


  constructor(private http: HttpClient) { }

  getCentralizadormesid(idmescentralizador:string): Observable<Centralizadormes> {
    return this.http.get<Centralizadormes>(`${this.baseUrl}/centralizadormes/tablacentralizador/${idmescentralizador}`);
    
  }

  getCentralizadormes(id:number, anioActual:number): Observable<Centralizadormes> {
       return this.http.get<Centralizadormes>(`${this.baseUrl}/centralizadormes/tablacentralizador/${id}/${anioActual}`);
    
  }

  async patchObservacion(idcentralizadormes: string, observacion:string) {
    
    const datos = {
      observacion: observacion,
      
    };
  
    try{
     return  await firstValueFrom(this.http.patch(`${this.baseUrl}/centralizadormes/${idcentralizadormes}`, datos, { headers: this.headers }))
    }catch(e){
      return e
    }
  
  
  }

  async patchmescentraliador(idcentralizadormes: string, saldoiva:string ) {
    const datos={
      saldoiva: saldoiva,
    }
    try{
     return  await firstValueFrom(this.http.patch(`${this.baseUrl}/centralizadormes/${idcentralizadormes}`, datos, { headers: this.headers }))
    }catch(e){
      return e
    }
  
  
  }

  async patchmescentraliadorivaimpuestos(idcentralizadormes: string, ivaimpuestos:string ) {
    const datos={
      ivaimpuestos: ivaimpuestos,
    }
    try{
     return  await firstValueFrom(this.http.patch(`${this.baseUrl}/centralizadormes/${idcentralizadormes}`, datos, { headers: this.headers }))
    }catch(e){
      return e
    }
  
  
  }

 
  







  
}
