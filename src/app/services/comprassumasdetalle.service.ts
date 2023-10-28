import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Comprassumasdetalle } from '../models/comprassumasdetalle';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprassumasdetalleService {

  
  constructor(private http:  HttpClient,
       
    ) {}
    
    private baseUrl = environment.url;
    private headers = { 'Content-Type': 'application/json' };
    
    
    
   

     getComprassumasdetalle(idcomprasumadetalle:string): Observable<Comprassumasdetalle>{
  
       return this.http.get<Comprassumasdetalle>(`${this.baseUrl}/comprassumas/comprassumas/${idcomprasumadetalle}`).pipe(
        catchError((error)=>{
          console.log('Error desde el servicio',error)
          return throwError(() => error);
        })
      )
      
    }

    async patchComprasumadetalles(idcentralizadormes: string, jsondatosarray:any) {
      
    
      try{
       return  await firstValueFrom(this.http.patch(`${this.baseUrl}/comprassumasdetalle/${idcentralizadormes}`, jsondatosarray, { headers: this.headers }))
      }catch(e){
        return e
      }
    
    
    }

    
 
}
