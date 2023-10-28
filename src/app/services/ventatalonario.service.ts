import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom } from 'rxjs';
import { SumatalonarioService } from './sumatalonario.service';

@Injectable({
  providedIn: 'root'
})
export class VentatalonarioService {
  constructor(private http:  HttpClient,
              private sumatalonarioService: SumatalonarioService,
    ) {}
  
   private baseUrl = environment.url;
   private headers = { 'Content-Type': 'application/json' };

  async createVentatalonario( jsondatos:any) {

    console.log("entra als erviceeeeeeee",jsondatos);
    try{
     return  await firstValueFrom(this.http.post(`${this.baseUrl}/venatatalonario`, jsondatos, { headers: this.headers }))
    }catch(e){
      return e
    }
    
  

  }

 
  
  async createVentatalonarioelectronico(idventatalonario:string,factinicial:number,factfinal:number,monto:number,idpuntoventa:number) {
    const jsondatoselectronicos = {
     idventatalonario: idventatalonario,
     numtalonario: 1,
     factinicial: factinicial,
     factfinal: factfinal,
     tipo:3,
     montototal: Number(monto),
     idpuntoventa:idpuntoventa,
   };
 
   try{
    return  await firstValueFrom(this.http.post(`${this.baseUrl}/venatatalonario/`, jsondatoselectronicos, { headers: this.headers }))
   }catch(e){
     return e
   }
 
 
 }

 async createVentatalonarioelectronicoarchivo(observacion:string, archivo:any,idventatalonario:string) {
  const jsondatoselectronicos = {
   idarchivotalonarioelectronico: uuidv4(),
   observacion: observacion,
   archivo:archivo,
   idventatalonario:idventatalonario,
 };

 try{
  return  await firstValueFrom(this.http.post(`${this.baseUrl}/archivostalonarioelectronico/`, jsondatoselectronicos, { headers: this.headers }))
 }catch(e){
   return e
 }


}



}
