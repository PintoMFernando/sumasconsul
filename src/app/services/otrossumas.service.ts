import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { otrossumas } from '../models/otrossumas.model';

@Injectable({
  providedIn: 'root'
})
export class OtrossumasService {

  
  constructor(private http:  HttpClient,
       
    ) {}
    
    private baseUrl = environment.url;
    private headers = { 'Content-Type': 'application/json' };
    
    async createotrossuma( jsondatos:any) {
    
    console.log("entra als erviceeeeeeee",jsondatos);
    try{
    return  await firstValueFrom(this.http.post(`${this.baseUrl}/otrossumas`, jsondatos, { headers: this.headers }))
    }catch(e){
    return e
    }
    }

    getOtrossumas(idcentralizadormes:string): Observable<otrossumas> {
      return this.http.get<otrossumas>(`${this.baseUrl}/centralizadormes/otrossumas/${idcentralizadormes}`);
    }

    getsolodetallesOtrossumas(idcentralizadormes:string): Observable<otrossumas> {
      return this.http.get<otrossumas>(`${this.baseUrl}/otrossumas/solodetalles/${idcentralizadormes}`);
    }

    async deleteOtrossumasdetalles(idcentralizadormes:string){
      //importante manejar el subscribe para eliminar
      console.log(idcentralizadormes);
   return await this.http.delete(`${this.baseUrl}/otrossumas/${idcentralizadormes}`).subscribe(
     () => {
       console.log('Observación eliminada correctamente otrosuma');
     },
     (error) => {
       console.error('Error al eliminar la observación otrosuma', error);
     }
   );;

  }


  async buscarcrearborrarotrossumas( idcentralizadormes:string,jsondatos:any) {
    try{
     return  await firstValueFrom(this.http.post(`${this.baseUrl}/otrossumas/buscarborrarcrear/${idcentralizadormes}`, jsondatos, { headers: this.headers }))
    }catch(e){
      return e
    }
    
  
  
  }





    
    
}
