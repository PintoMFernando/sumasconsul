import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, lastValueFrom, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Centralizador } from '../models/centralizador.model';
import { error } from 'jquery';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CentralizadorService {

  private baseUrl = environment.url;
  private headers = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient) { }

  async postCentralizador(id:number, anio:number){
    
    
    const datos = {
      idcentralizador: uuidv4(),
      anio:Number(anio),
      id_empresa:id
    };

    
    console.log('Este es el JSON DE DATOS post',datos);
    try{
     return  await firstValueFrom(this.http.post(`${this.baseUrl}/centralizador/`, datos, { headers: this.headers }))
    }catch(e){
      return e
    }
  
  
  }
  
  getCentralizador(id:number, anioActual:number): Observable<Centralizador> {
  
    return this.http.get<Centralizador>(`${this.baseUrl}/centralizador/tablacentralizador/${id}/${anioActual}`).pipe(
      catchError((error)=>{
        console.log('Error desde el servicio',error)
        return throwError(() => error);
      })
    )
    
  }
  getCentralizadormesbuscar(id:number,anioActual:number): Observable<Centralizador> {
    console.log('entra a la busqueda',id,anioActual );
    return this.http.get<Centralizador>(`${this.baseUrl}/centralizador/tablacentralizadorbuscar/${id}/${anioActual}`);
  }
  
}
