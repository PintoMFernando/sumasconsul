import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

import { Observable, firstValueFrom } from 'rxjs';
import { SumatalonarioService } from './sumatalonario.service';

@Injectable({
  providedIn: 'root'
})
export class VentatalonarioService {
  constructor(private http:  HttpClient,
           
    ) {}
  
   private baseUrl = environment.url;
   private headers = { 'Content-Type': 'application/json' };

  async createVentatalonario( jsondatos:any) {

    console.log("entra als erviceeeeeeee",jsondatos);
    try{
     return  await firstValueFrom(this.http.post(`${this.baseUrl}/venatatalonario`, jsondatos, { headers: this.headers }))
    }catch(e){
      return e
    }
    
  

  }

 
  
 

getventaactividadbusqueda(idventaactividad:string): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/venatatalonario/busquedaventtalonario/${idventaactividad}`);

}

async deleteVentatalonario(idventatalonario:string){
  //importante manejar el subscribe para eliminar
  console.log(idventatalonario);
return await this.http.delete(`${this.baseUrl}/venatatalonario/${idventatalonario}`).subscribe(
 () => {
   console.log('Talonario eliminada correctamente');
 },
 (error) => {
   console.error('Error al eliminar el talonario', error);
 }
)

}


async createdelteVentasSumas( jsondatosventas:any) {

  
  try{
  return  await firstValueFrom(this.http.post(`${this.baseUrl}/venatatalonario/buscarborraractualizar`, jsondatosventas, { headers: this.headers }))
  }catch(e){
  return e
  }
  
  
  
  }


  async createVentasTodo( arraytoddo:any) {

  
    try{
    return  await firstValueFrom(this.http.post(`${this.baseUrl}/venatatalonario/buscarborraractualizar`, arraytoddo, { headers: this.headers }))
    }catch(e){
    return e
    }
    
    
    
    }







}
