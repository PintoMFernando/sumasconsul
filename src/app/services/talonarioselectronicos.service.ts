import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { TalonarioElectronico } from '../models/talonarioelectronico.model';
@Injectable({
  providedIn: 'root'
})
export class TalonarioselectronicosService {

  constructor(private http:  HttpClient,
    
) {}

private baseUrl = environment.url;
//private headers = { 'Content-Type': 'application/json' };



 async createVentatalonarioelectronicoarchivo(formdataelectronicos:any) {
  console.log("entra  ami service archivo electronico??????",formdataelectronicos);
 try{
  return  await firstValueFrom(this.http.post(`${this.baseUrl}/archivostalonarioelectronico`, formdataelectronicos))
 }catch(e){
   return e
 }


}


getTalonarioElctronicobusqueda(idpuntoventaactividad:string,idcentralizadormes:string, punto:number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/archivostalonarioelectronico/${idpuntoventaactividad}/${idcentralizadormes}/${punto}`);

}


async deleteTalonarioElctronico(idpuntoventaactividad:string,idmespuntoventasuma:string,tipotalonario:number){
  //importante manejar el subscribe para eliminar

return await this.http.delete(`${this.baseUrl}/venatatalonario/${idpuntoventaactividad}/${idmespuntoventasuma}/${tipotalonario}`).subscribe(
 () => {
   console.log('Talonario Electronico eliminado correctamente');
 },
 (error) => {
   console.error('Error al eliminar el talonario', error);
 }
);

}








}


