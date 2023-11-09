import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { puntoventaactividad } from '../models/puntoventaactividad.model';

@Injectable({
  providedIn: 'root'
})
export class PuntoventaactividadService {

  constructor(private http:  HttpClient) {}
  private baseUrl = environment.url;
  private headers = { 'Content-Type': 'application/json' };
  



getPuntoventaactividad(idempresa:number): Observable<puntoventaactividad>{
  return this.http.get<puntoventaactividad>(`${this.baseUrl}/puntoventaactividad/${idempresa}`).pipe(
   catchError((error)=>{
     console.log('Error desde el servicio',error)
     return throwError(() => error);
   })
  )
  
  }



  async createPuntoventaactividad(jsondatosarray:any) {
    try{
     return  await firstValueFrom(this.http.post(`${this.baseUrl}/puntoventaactividad/`, jsondatosarray, { headers: this.headers }))
    }catch(e){
      return e
    }
    
  

  }

 

getPuntoventaactividadbusqueda(idactividades:number,idpuntoventa:number): Observable<puntoventaactividad>{
return this.http.get<puntoventaactividad>(`${this.baseUrl}/puntoventaactividad/${idactividades}/${idpuntoventa}`).pipe(
 catchError((error)=>{
   console.log('Error desde el servicio',error)
   return throwError(() => error);
 })
)

}

async deletePuntoventaactividad(idpuntoventaactividad:string){
  //importante manejar el subscribe para eliminar
  console.log(idpuntoventaactividad);
return await this.http.delete(`${this.baseUrl}/puntoventaactividad/${idpuntoventaactividad}`).subscribe(
 () => {
   console.log('Actividad eliminada correctamente');
 },
 (error) => {
   console.error('Error al eliminar la actividad', error);
 }
);;

}

async patchPuntoventaactividad(idpuntoventaactividad: string,jsondatos:any) {
  
  try{
   return  await firstValueFrom(this.http.patch(`${this.baseUrl}/puntoventaactividad/${idpuntoventaactividad}`, jsondatos, { headers: this.headers }))
  }catch(e){
    return e
  }


}



  

 

}
