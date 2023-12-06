import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa.model';
import { User } from '../models/user.model';
import { Comprassumasdetalle } from '../models/comprassumasdetalle';
import { Comprassumas } from '../models/comprassumas';
import { Centralizadormes } from '../models/centralizadormes.model';
import { otrossumas } from '../models/otrossumas.model';
import { ventataalonario } from '../models/ventatalonario';
import { EmpresaService } from './empresa.service';
import { UserService } from './user.service';
import { CentralizadormesService } from './centralizadormes.service';
import { EmpresadatosinicialesService } from './empresadatosiniciales.service';
import { ComprassumasService } from './comprassumas.service';
import { lastValueFrom, take } from 'rxjs';
import { ComprassumasdetalleService } from './comprassumasdetalle.service';
import { OtrossumasService } from './otrossumas.service';
import { SumatalonarioService } from './sumatalonario.service';
import { VentatalonarioService } from './ventatalonario.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  
  constructor( 
    private empresaService: EmpresaService,
    private userService: UserService,
    private centralizadormesService :CentralizadormesService,
    private empresadatosiniciales: EmpresadatosinicialesService,
    public mesconcomprasumasservice: ComprassumasService,
    public comprassumasdetalleService:  ComprassumasdetalleService,
    private sumasotrosService:  OtrossumasService,
    public sumatalonarioService: SumatalonarioService,
    public ventastalonarioService: VentatalonarioService,
  ) { }

  //datos empresa
  async traerdatosempresalocalstorage(idempresa:number){
    this.empresaService.getEmpresa(idempresa).subscribe(data => {
    this.SetDatosEmpresa(data);
    });
  }
  //datosuser
  async traerdatosuserlocalstorage(iduser:number){
    this.userService.getUser().subscribe(data => {
      this.SetUser(data); 
      });
  }
  //datos del centralizador
  async traerdatoscentralizadorlocalstorage(idempresa:number,anio:number){
    this.centralizadormesService.getCentralizadormes(idempresa,anio).subscribe(data => {
      this.SetCentralizador(data); 
     
      });
  }
  //datos de datos inicalesempresa detalles
  async traerdatosempresadetalleslocalstorage(idcentralizador:string){
    this.empresadatosiniciales.getEmpresadatosiniciales(idcentralizador).subscribe(data => {
      this.SetEmpresadetalles(data); 
      
      });
  }

   //datos de  idcomprassumas
   async traerdatoscompraslocalstorage(idmescentralizadormes:string){
    let source$ = this.mesconcomprasumasservice.getComprassumas(idmescentralizadormes); 
    let data:any = await lastValueFrom(source$); 
    this.SetCompras(data[0].comprassumas.idcomprasuma); 
   
  }

  //datos de  comprassumnasdetalles
  async traerdatoscomprasdetalleslocalstorage(idcomprasuma:string){
    //  if(idcomprasuma ==  this.GetCompras())
    await this.ClearComprasDetalles();
     let sources$ = this.comprassumasdetalleService.getComprassumassolodetalles(idcomprasuma);  //esto trae los datos de la db
    let data:any = await lastValueFrom(sources$);
    await this.SetComprasDetalles(data);
    
  }
  //datos gaurdar comprassumasdetalles
  async postComprasumadetalleslocal(jsoncompradetalles:any){
    await this.ClearComprasDetalles();
    await this.SetComprasDetalles(jsoncompradetalles);  //esto guarda los datos en el ls
   
    
  
 }

 async postComprasumadetallesDB_Local(idcomprasuma:string, jsoncompradetalles:any){
  await this.ClearComprasDetalles();
  let sources$ = this.comprassumasdetalleService.searchdeletepactchcompras(idcomprasuma,jsoncompradetalles); //esto guarda los datos en la db 
 await this.SetComprasDetalles(jsoncompradetalles);                                                          //esto guarda los datos en el ls
 
  

}

//traer datos otros
async traerdatosotroslocalstorage(idmescentralizadormes:string){
  let source$ = this.sumasotrosService.getOtrossumas(idmescentralizadormes); 
  let data:any = await lastValueFrom(source$); 
  this.SetOtros(data[0].otrossumas);
 
}

//guardar datos otros localestorage
async traerdatosguardarotroslocalstorage(jsondatosotros:any){
  await this.ClearOtros();
  await this.SetOtros(jsondatosotros);  //esto guarda los datos en el ls
 
}

//guarda datos otros en la db
async traerdatosbuscarcrearborrarotros(idmescentralizadormes:string,jsondatosotros:any){
  await this.ClearOtros();
  let source$ = this.sumasotrosService.buscarcrearborrarotrossumas(idmescentralizadormes,jsondatosotros); 
  //let data:any = await lastValueFrom(source$); 
  await this.SetOtros(jsondatosotros);   
  
 
}

async traerventaslocalstorage(idmespuntoventasuma:string,idtipo:number){
  //const datosActuales = this.GetVentas();
 //await this.ClearVentas();
 let source$ = this.sumatalonarioService.getTalonariosuma(String(idmespuntoventasuma),idtipo); //con esto traigo el id
  let data:any = [await lastValueFrom(source$)];
 await this.SetVentas(data);
 /*if( localStorage.getItem('ventas')){  //el ls estavacio
  console.log('Datos después de almacenar: HOLOOOS ESTA VACIO PREGUNTAR EL DB ESTA VACIO????????');
  let source$ = this.sumatalonarioService.getTalonariosuma(String(idmespuntoventasuma),idtipo); //con esto traigo el id
  let data:any = await lastValueFrom(source$);
  if(data){ //la db esta vacio
     //necesita crear no hay datos muestra ne blanco 
  }else{
   
  }

 }else{
  let source$ = this.sumatalonarioService.getTalonariosuma(String(idmespuntoventasuma),idtipo); //con esto traigo el id
  let data:any = await lastValueFrom(source$);
  //el local storaqge no esta vacio entonces..muestra en blanco 
  if(!data){ //la db esta vacio
    //necesita crear no hay datos muestra ne blanco 
 }else{
   await this.SetVentas(data);
 }
 }
 
*/
  
 
}

//esto guarda en el localstorage 
async guardarsumasventaslocalstorage(jsondatoventas:any){
  console.log('Datos anteeees de almacenar:', jsondatoventas);
  await this.ClearVentas();
 
  await this.SetVentas(jsondatoventas);  //esto guarda los datos en el ls
 
}

//guarde en el la db 
async guardarsumasventasDBlocalstorage(){
  //await this.ClearVentas();
  const enviar= await this.GetVentas()
  console.log("estos son mi datos a guardaaaaaaaaaaaaaardadoooooHOLOS enserio entras mas de una vez?????",enviar)
  await this.ventastalonarioService.createdelteVentasSumas(enviar); //aqui reducimos codigo solo enviando el json y el id
  //let data:any = await lastValueFrom(source$); 
  //await this.SetVentas(jsondatosotros);   
  
 
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


  SetCentralizador(centralizador:any){
    localStorage.setItem("centralizador",JSON.stringify(centralizador));
  }
  GetCentralizador():any{
    if(localStorage.getItem("centralizador")){
      let centralizador = localStorage.getItem("centralizador")??'';
      return JSON.parse(centralizador);
    }
    else
    return [];
  }
  StateCentralizador():boolean{
    return localStorage.getItem("centralizador")!==null;
  }



  SetEmpresadetalles(Empresadetalles:any){
    localStorage.setItem("Empresadetalles",JSON.stringify(Empresadetalles));
  }
  GetEmpresadetalles():any{
    if(localStorage.getItem("Empresadetalles")){
      let Empresadetalles = localStorage.getItem("Empresadetalles")??'';
      return JSON.parse(Empresadetalles);
    }
    else
    return [];
  }
  StateEmpresadetalles():boolean{
    return localStorage.getItem("Empresadetalles")!==null;
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



  SetComprasDetalles(comprassumasdetalles:Comprassumas){
    localStorage.setItem("comprassumasdetalles",JSON.stringify(comprassumasdetalles));
  }
  GetComprasDetalles():Comprassumas{
    if(localStorage.getItem("comprassumasdetalles")){
      let comprassumasdetalles = localStorage.getItem("comprassumasdetalles")??'';
      return JSON.parse(comprassumasdetalles);
    }
    else
    return new Comprassumas();
  }
  StateComprasDetalles():boolean{
    return localStorage.getItem("comprassumasdetalles")!==null;
  }
  ClearComprasDetalles() {
    localStorage.removeItem("comprassumasdetalles");
  }










  SetVentas(ventas: any) {
    localStorage.setItem("ventas",JSON.stringify(ventas));
  }
  GetVentas():any[]{
    if(localStorage.getItem("ventas")){
      let ventas = localStorage.getItem("ventas")??'';
      return ventas ? JSON.parse(ventas) : [];
    }
    else
    return [];
  }
  StateVentas():boolean{
    return localStorage.getItem("ventas")!==null;
  }
  ClearVentas() {
    localStorage.removeItem("ventas");
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
  ClearOtros() {
    localStorage.removeItem("otrosumasresultados");
  }




  





}
