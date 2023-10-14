import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Observaciones } from '../models/observaciones.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ObservacionesService {

  constructor(private http:  HttpClient) {}
   private baseUrl = environment.url;
   private headers = { 'Content-Type': 'application/json' };


   getObservaciones(idobservaciones:string): Observable<Observaciones> {
    return this.http.get<Observaciones>(`${this.baseUrl}/observaciones/${idobservaciones}`);
    
   }

   async createObservacion(idcentralizadormes: string, observacion:string) {
    const datos = {
      idobservaciones: uuidv4(),
      observacion: observacion,
      iduser: 1,
      idmescentralizador: idcentralizadormes
      
    };
  
    try{
     return  await firstValueFrom(this.http.post(`${this.baseUrl}/observaciones`, datos, { headers: this.headers }))
    }catch(e){
      return e
    }
  
  
  }



  async patchObservacion(idcentralizadormes: string, observacion:string) {
    const datos = {
      observacion: observacion,
      
    };
  
    try{
     return  await firstValueFrom(this.http.patch(`${this.baseUrl}/observaciones/${idcentralizadormes}`, datos, { headers: this.headers }))
    }catch(e){
      return e
    }
  
  
  }

  
  async deleteObservaciones(idobservaciones:string){
       //importante manejar el subscribe para eliminar
       console.log(idobservaciones);
    return await this.http.delete(`${this.baseUrl}/observaciones/${idobservaciones}`).subscribe(
      () => {
        console.log('Observación eliminada correctamente');
      },
      (error) => {
        console.error('Error al eliminar la observación', error);
      }
    );;
 
   }
}
