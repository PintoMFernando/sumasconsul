import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Puntoventa } from '../models/puntoventa.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

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


}
