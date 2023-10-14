import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CobroService {


  private baseUrl = environment.url;
  private headers = { 'Content-Type': 'application/json' };
  
  

  constructor(private http: HttpClient) { }

  async postCobro(tipopago:number,estado:number,monto:number,respcobro:number,observacion:string,idmescentralizador:string,resppago:string) {
    const fechaHoy = new Date();
    const cValue = formatDate(fechaHoy, 'yyyy-MM-dd', 'en-US');
        
    const datos = {
      idcobro: uuidv4(),
      tipo: tipopago,
      estado: estado,
      fecha: cValue,
      monto: monto,
      respcobro: respcobro,
      observacion: observacion,
      idmescentralizador: idmescentralizador,
      responsablepago:resppago,
      
    };

     ///muy importante al momento de hacer  post  NOS FALTA MANDAR
    console.log('Este es el JSON DE DATOS post',datos);
    try{
     return  await firstValueFrom(this.http.post(`${this.baseUrl}/cobro/`, datos, { headers: this.headers }))
    }catch(e){
      return e
    }
  
  
  }
  
  
}

