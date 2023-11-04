import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { mespuntoventasuma } from '../models/mespuntoventasuma.model';

@Injectable({
  providedIn: 'root'
})
export class MespuntoventasumaService {

  constructor(private http:  HttpClient,
       
    ) {}
    
    private baseUrl = environment.url;
    private headers = { 'Content-Type': 'application/json' };
    
     getmespuntoventasuma( idmescentralizador:string):Observable<mespuntoventasuma> {
   
return  this.http.get<mespuntoventasuma>(`${this.baseUrl}/mespuntoventasuma/${idmescentralizador}`).pipe(
 catchError((error)=>{
   console.log('Error desde el servicio',error)
   return  throwError(() => error);
 })
)


}

async createMespuntoventa(jsondatosarray:any) {
  try{
   return  await firstValueFrom(this.http.post(`${this.baseUrl}/mespuntoventasuma/`, jsondatosarray, { headers: this.headers }))
  }catch(e){
    return e
  }
  

}






}
