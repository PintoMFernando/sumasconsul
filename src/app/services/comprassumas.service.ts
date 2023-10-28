import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Comprassumas } from '../models/comprassumas';
import { Comprassumasdetalle } from '../models/comprassumasdetalle';

@Injectable({
  providedIn: 'root'
})
export class ComprassumasService {

  
  constructor(private http:  HttpClient,
       
) {}

private baseUrl = environment.url;
private headers = { 'Content-Type': 'application/json' };

async createcomprasuma( jsondatos:any) {

console.log("entra als erviceeeeeeee",jsondatos);
try{
return  await firstValueFrom(this.http.post(`${this.baseUrl}/comprassumas`, jsondatos, { headers: this.headers }))
}catch(e){
return e
}



}

getComprassumas(idcentralizadormes:string): Observable<Comprassumas> {
  return this.http.get<Comprassumas>(`${this.baseUrl}/centralizadormes/tablacentralizadorgato/${idcentralizadormes}`);

}






}
