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
  
       return this.http.get<Comprassumasdetalle>(`${this.baseUrl}/comprassumasdetalle/${idcomprasumadetalle}`).pipe(
        catchError((error)=>{
          console.log('Error desde el servicio',error)
          return throwError(() => error);
        })
      )
      
    }

      getComprassumassolodetalles(idcomprasuma:string): Observable<Comprassumasdetalle>{
        console.log("aqui esta el ID",idcomprasuma)
      return this.http.get<Comprassumasdetalle>(`${this.baseUrl}/comprassumasdetalle/solodetalles/${idcomprasuma}`).pipe(
       catchError((error)=>{
         console.log('Error desde el servicio',error)
         return throwError(() => error);
       })
     )
     
   }



    async postComprasumadetalles(jsondatosarray:any) {
      
    
      try{
       return  await firstValueFrom(this.http.post(`${this.baseUrl}/comprassumasdetalle/`, jsondatosarray, { headers: this.headers }))
      }catch(e){
        return e
      }
      
    
    }


    async patchComprasumadetalles(idcentralizadormes: string, jsondatosarray:any) {
      
    
      try{
       return  await firstValueFrom(this.http.patch(`${this.baseUrl}/comprassumasdetalle/${idcentralizadormes}`, jsondatosarray, { headers: this.headers }))
      }catch(e){
        return e
      }
    
    
    }

    async deleteComprasumadetalles(idcomprasumadetalle:string){
      //importante manejar el subscribe para eliminar
      console.log(idcomprasumadetalle);
   return await this.http.delete(`${this.baseUrl}/comprassumasdetalle/${idcomprasumadetalle}`).subscribe(
     () => {
       console.log('Observación eliminada correctamente');
     },
     (error) => {
       console.error('Error al eliminar la observación', error);
     }
   );;

  }

    
 
}
