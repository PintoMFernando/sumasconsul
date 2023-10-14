import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Empresa } from '../models/empresa.model';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private baseUrl = environment.url;
  private headers = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient) { }

  getEmpresa(id:number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.baseUrl}/empresa/${id}`);
    
  }


  async patchmescentralizadorcomision(idempresa: number, comision:string ) {
    const datos={
      comision: Number(comision),
    } 
    try{
     return  await firstValueFrom(this.http.patch(`${this.baseUrl}/empresa/${idempresa}`, datos, { headers: this.headers }))
    }catch(e){
      return e
    }
  
  
  }

  
  
}
