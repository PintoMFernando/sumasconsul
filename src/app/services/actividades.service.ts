import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http:  HttpClient) {}
  private baseUrl = environment.url;
  


  async getActividadestipo(){
   return  await this.http.get(`${this.baseUrl}/actividades/tipo/`);
   
  }

  async getActividadesseccion(seccion:string) {
     return await this.http.get(`${this.baseUrl}/actividades/seccion/${seccion}`);
    
   }

   async getActividadesdivision(seccion:string,division:number) {
    return await this.http.get(`${this.baseUrl}/actividades/division/${seccion}/${division}`);
   
  }

  

}


