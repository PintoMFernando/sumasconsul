import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  constructor() { }
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

}
