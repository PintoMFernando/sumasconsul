import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Empresadatosiniciales } from '../models/empresadatosiniciales.model';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresadatosinicialesService {



  private baseUrl = environment.url;
  private headers = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient) { }

  getEmpresadatosiniciales(idempresadatosiniciales:string): Observable<Empresadatosiniciales> {
    return this.http.get<Empresadatosiniciales>(`${this.baseUrl}/empresadatosiniciales/${idempresadatosiniciales}`);
    
  }

  async patchEmpresadatosinicialtrabajo(idempresadatosiniciales: string, trabajo:string,  ) {
    const datos={
      trabajo: Number(trabajo),
    }
    console.log("dato essss",datos);
    console.log("idddd",idempresadatosiniciales);
    try{
     return  await firstValueFrom(this.http.patch(`${this.baseUrl}/empresadatosiniciales/${idempresadatosiniciales}`, datos, { headers: this.headers }))
    }catch(e){
      return e
    }
  
  
  }

  async patchEmpresadatosinicialbalance(idempresadatosiniciales: string, balance:string,  ) {
    const datos={
      balance: Number(balance),
    }
    console.log("dato essss",datos);
    console.log("idddd",idempresadatosiniciales);
    try{
     return  await firstValueFrom(this.http.patch(`${this.baseUrl}/empresadatosiniciales/${idempresadatosiniciales}`, datos, { headers: this.headers }))
    }catch(e){
      return e
    }
  
  
  }





  
  
}
