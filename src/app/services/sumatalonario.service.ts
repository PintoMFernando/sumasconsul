import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SumatalonarioService {

  constructor(private http:  HttpClient) {}
  private baseUrl = environment.url;
  private headers = { 'Content-Type': 'application/json' };

 async createSumatalonario( jsondatos:any) {
  console.log("entra als erviceeeeeeee d e SUMA",jsondatos);
   try{
    return  await firstValueFrom(this.http.post(`${this.baseUrl}/sumatalonario`, jsondatos, { headers: this.headers }))
   }catch(e){
     return e
   }
 
 
 }

 /*getTalonariosuma(idcentralizadormes:string): Observable<puntoventaactividad>{
  return this.http.get<puntoventaactividad>(`${this.baseUrl}/puntoventaactividad/${idempresa}`).pipe(
   catchError((error)=>{
     console.log('Error desde el servicio',error)
     return throwError(() => error);
   })
  )
  
  }
*/
 

}
