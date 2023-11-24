import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Empresa } from '../models/empresa.model';
@Injectable({
  providedIn: 'root'
})
export class ServicioConexionService {

  private baseUrl = environment.url;

  constructor(private http: HttpClient) { }

  getDatos(): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.baseUrl}/empresa/1516`);
    
  }
  
}
