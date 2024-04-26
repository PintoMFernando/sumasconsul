import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, Subscription, catchError, firstValueFrom, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import * as uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { ModalserviceService } from './modalservice.service';
import { producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

 

  constructor(
    private http:  HttpClient,
 
       
  ) {


   
 
  }

  private baseUrl = environment.url;
    private headers = { 'Content-Type': 'application/json' };
    
    async createproducto( jsondatos:any) {
      

     
    
    console.log("entra als erviceeeeeeee",jsondatos);
    try{
    return  await firstValueFrom(this.http.post(`${this.baseUrl}/producto`, jsondatos))
    }catch(e){
    return e
    }
    }


    async traerProductos(){

        return await this.http.get(`${this.baseUrl}/producto`);
      


    }
   


    async patchProducto(idproducto: string, observacion:string) {
      const datos = {
        observacion: observacion,
        
      };
    
      try{
       return  await firstValueFrom(this.http.patch(`${this.baseUrl}/producto/${idproducto}`, datos, { headers: this.headers }))
      }catch(e){
        return e
      }
    
    
    }


    async deleteproducto(idproducto:string){
      //importante manejar el subscribe para eliminar
      //console.log(idcentralizadormes);
   return await this.http.delete(`${this.baseUrl}/producto/${idproducto}`).subscribe(
     () => {
       console.log('Observación eliminada correctamente otrosuma');
     },
     (error) => {
       console.error('Error al eliminar la observación otrosuma', error);
     }
   );;

  }



/* async verProducto(idproducto:any):Promise<Observable<producto>> {

      console.log("llega mi id??", idproducto)
      return  await this.http.get<producto>(`${this.baseUrl}/producto/unproducto/${idproducto}` )

}*/

verProducto(idproducto:string): Observable<producto>{
  console.log("que es exacaamnte esto??", idproducto)
  return this.http.get<producto>(`${this.baseUrl}/producto/unproducto/${idproducto}`).pipe(
   catchError((error)=>{
     console.log('Error desde el servicio',error)
     return throwError(() => error);
   })
  )
  
  }


  editarProducto(idproducto:string): Observable<producto>{
    console.log("que es exacaamnte esto??", idproducto)
    return this.http.get<producto>(`${this.baseUrl}/producto/unproducto/${idproducto}`).pipe(
     catchError((error)=>{
       console.log('Error desde el servicio',error)
       return throwError(() => error);
     })
    )
    
    }


    
  async cantidadProductos(): Promise<number> {
    const response: any = await this.http.get<number>(`${this.baseUrl}/producto/conteoproducto`).toPromise();
    return response; // Devuelve el conteo de productos
  }
    



}
