import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa.model';
import { User } from '../models/user.model';
import { Comprassumasdetalle } from '../models/comprassumasdetalle';
import { Comprassumas } from '../models/comprassumas';
import { Centralizadormes } from '../models/centralizadormes.model';
import { otrossumas } from '../models/otrossumas.model';
import { ventataalonario } from '../models/ventatalonario';
import { EmpresaService } from './empresa.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  item: Empresa = new Empresa(); 
  
  constructor( 
    private empresaService: EmpresaService,
  ) { }


  async traerdatosempresalocalstorage(idempresa:number){
    this.empresaService.getEmpresa(idempresa).subscribe(data => {

    this.SetDatosEmpresa(data);
    //this.item = this.GetDatosEmpresa();
   /*    if (this.datosTable) {
        this.miAdaptadorPrimeNG.personalizarTabla(this.datosTable);
      } else {
      console.error('La referencia datosTable es undefined.');
    }*/
    });


  }




  reset(){
    localStorage.clear();
  }
  SetDatosEmpresa(empresa:Empresa){
    localStorage.setItem("empresa",JSON.stringify(empresa));
  }
  GetDatosEmpresa():Empresa{
    
    if(localStorage.getItem("empresa")){
      let empresa = localStorage.getItem("empresa")??'';
      return JSON.parse(empresa);
    }
    else
    return new Empresa();
  }
  StateEmpresa():boolean{
    return localStorage.getItem("empresa")!==null;
  }




  SetUser(cruge_user:User){
    localStorage.setItem("cruge_user",JSON.stringify(cruge_user));
  }
  GetUser():User{
    if(localStorage.getItem("cruge_user")){
      let cruge_user = localStorage.getItem("cruge_user")??'';
      return JSON.parse(cruge_user);
    }
    else
    return new User();
  }
  StateUser():boolean{
    return localStorage.getItem("cruge_user")!==null;
  }

   

  /*SetCentralizadormes(centralizadormes: Centralizadormes){
    localStorage.setItem("centralizadormes",JSON.stringify(centralizadormes));
  }
  GetCentralizadormes():Centralizadormes{
    if(localStorage.getItem("centralizadormes")){
      let centralizadormes = localStorage.getItem("centralizadormes")??'';
      return JSON.parse(centralizadormes);
    }
    else
    return new Centralizadormes();
  }
  StateCentralizadormes():boolean{
    return localStorage.getItem("centralizadormes")!==null;
  }
*/



  SetCompras(comprassumas:Comprassumas){
    localStorage.setItem("comprassumas",JSON.stringify(comprassumas));
  }
  GetCompras():Comprassumas{
    if(localStorage.getItem("comprassumas")){
      let comprassumas = localStorage.getItem("comprassumas")??'';
      return JSON.parse(comprassumas);
    }
    else
    return new Comprassumas();
  }
  StateCompras():boolean{
    return localStorage.getItem("comprassumas")!==null;
  }







  SetVentas(ventas:any){
    localStorage.setItem("ventas",JSON.stringify(ventas));
  }
  GetVentas():any{
    if(localStorage.getItem("ventas")){
      let ventas = localStorage.getItem("ventas")??'';
      return JSON.parse(ventas);
    }
    else
    return [];
  }
  StateVentas():boolean{
    return localStorage.getItem("ventas")!==null;
  }





  SetOtros(otrosumas:otrossumas){
    localStorage.setItem("otrosumas",JSON.stringify(otrosumas));
  }
  GetOtros():otrossumas{
    if(localStorage.getItem("otrosumas")){
      let otrosumas = localStorage.getItem("otrosumas")??'';
      return JSON.parse(otrosumas);
    }
    else
    return new otrossumas();
  }
  StateOtros():boolean{
    return localStorage.getItem("otrosumas")!==null;
  }

  SetOtrosresultados(otrosumasresultados:any){
    localStorage.setItem("otrosumasresultados",JSON.stringify(otrosumasresultados));
  }

  





}
