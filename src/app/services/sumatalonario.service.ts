import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ventataalonario } from '../models/ventatalonario';

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



  getTalonariosuma(idcentralizadormes:string,numtalonario:number): Observable<ventataalonario> {
    return this.http.get<ventataalonario>(`${this.baseUrl}/venatatalonario/ventames/${idcentralizadormes}/${numtalonario}`);
  
  }

 

}
