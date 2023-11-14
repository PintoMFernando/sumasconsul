import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Puntoventa } from '../models/puntoventa.model';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntoventaService {

  constructor(private http:  HttpClient) {}
  private baseUrl = environment.url;
  private headers = { 'Content-Type': 'application/json' };

  getPuntoVenta(idempresa:number): Observable<Puntoventa> {
    return this.http.get<Puntoventa>(`${this.baseUrl}/puntoventa/${idempresa}`, { headers: this.headers });
    
   }

   getPuntoventaactividad(idempresa:number): Observable<Puntoventa>{
    return this.http.get<Puntoventa>(`${this.baseUrl}/puntoventa/${idempresa}`).pipe(
     catchError((error)=>{
       console.log('Error desde el servicio',error)
       return throwError(() => error);
     })
    )
    
    }
  


}
