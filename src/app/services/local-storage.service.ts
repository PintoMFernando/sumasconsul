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
import { PuntoventaService } from './puntoventa.service';

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
    private puntoventaService: PuntoventaService, 
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
 //await this.SetVentas(data);
 console.log("asdipojsajf oi;sjoi;jsiorsjurjiojhfisjfsd",data)
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
async guardarsumasventaslocalstorage(jsondatoventas:any,idpuntoventaactividad:string){ //esto tendria que manejar para poder enviar a  la db 
  console.log('Datos anteeees de almacenar:', jsondatoventas);
  await this.ClearVentas(idpuntoventaactividad);
  await this.SetVentas(jsondatoventas,idpuntoventaactividad);  //esto guarda los datos en el ls
 
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



//ventasPrevaloradas
async traerventasPrevaloradaslocalstorage(idmespuntoventasuma:string,idtipo:number){
  //const datosActuales = this.GetVentas();
 //await this.ClearVentas();
 let source$ = this.sumatalonarioService.getTalonariosuma(String(idmespuntoventasuma),idtipo); //con esto traigo el id
  let data:any = [await lastValueFrom(source$)];
 await this.SetVentasPrevaloradas(data);
 console.log("asdipojsajf oi;sjoi;jsiorsjurjiojhfisjfsd",data)
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
async guardarsumasventasPrevaloradaslocalstorage(jsondatoventasprevaloradas:any){
  console.log('Datos anteeees de almacenar:', jsondatoventasprevaloradas);
  await this.ClearVentasPrevaloradas();
 
  await this.SetVentasPrevaloradas(jsondatoventasprevaloradas);  //esto guarda los datos en el ls
 
}

//guarde en el la db 
async guardarsumasventasPrevaloradasDBlocalstorage(){   //esto verificar
  //await this.ClearVentas();
  const enviar= await this.GetVentasPrevaloradas()
  console.log("estos son mi datos a guardaaaaaaaaaaaaaardadoooooHOLOS enserio entras mas de una vez?????",enviar)
  await this.ventastalonarioService.createdelteVentasSumas(enviar); //aqui reducimos codigo solo enviando el json y el id
  //let data:any = await lastValueFrom(source$); 
  //await this.SetVentas(jsondatosotros);   
  
 
}


 


//ventasTODO
async traerventasTodolocalstorage(idempresaglobal:number,centralizadormes:string){
  //const datosActuales = this.GetVentas();
 //await this.ClearVentas();
 
 const source$ =this.puntoventaService.getPuntoVentaTodo(idempresaglobal,centralizadormes); //esto tengo nque mover al local storage 
 const data:any = await lastValueFrom(source$);
 await this.SetVentasTodo(data);
 //this.puntoventa3=data;
 


 


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
async guardarsumasventasTodolocalstorage(ventastodo:any){

  await this.ClearVentasTodo();
  console.log('Datos anteeees de almacenar:', ventastodo);
  await this.SetVentasTodo3(ventastodo);  //esto guarda los datos en el ls

}

//guarde en el la db 
async guardarsumasventasTodoDBlocalstorage(){   //esto verificar
  //await this.ClearVentas();
  const enviar= await this.GetVentasTodo()
  console.log("estos son mi datos a guardaaaaaaaaaaaaaardadoooooHOLOS enserio entras mas de una vez?????",enviar)
  await this.ventastalonarioService.createVentasTodo(enviar); //aqui reducimos codigo solo enviando el json y el id
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










  SetVentas(ventas: any,id:string) {
    const serializedVentas = LocalStorageService.serializeWithoutCircular2(ventas);
    const palabraBase = "ventas";
    const resultado =palabraBase+id ;
    localStorage.setItem(resultado, serializedVentas);
 
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
  ClearVentas(id:string) {
    console.log("entra par borrara2222",id)
    const palabraBase = "ventas";
    const resultado =palabraBase+id ;
    localStorage.removeItem(resultado);
  }



  static serializeWithoutCircular2(obj: any): string {
    const seen = new WeakSet();

    function replacer(key: string, value: any) {
      if (key === 'hotRegisterer' || key === 'hyperformulaInstance') {
        return undefined; // Excluir propiedades específicas que puedan causar referencias circulares
      }

      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return undefined; // Evitar referencias circulares
        }
        seen.add(value);
      }
      return value;
    }

    return JSON.stringify(obj, replacer);
  }








  SetVentasPrevaloradas(ventasprevaloradas: any) {
    localStorage.setItem("ventasprevaloradas",JSON.stringify(ventasprevaloradas));
  }
  GetVentasPrevaloradas():any[]{
    if(localStorage.getItem("ventasprevaloradas")){
      let ventasprevaloradas = localStorage.getItem("ventasprevaloradas")??'';
      return ventasprevaloradas ? JSON.parse(ventasprevaloradas) : [];
    }
    else
    return [];
  }
  StateVentasPrevaloradas():boolean{
    return localStorage.getItem("ventasprevaloradas")!==null;
  }
  ClearVentasPrevaloradas() {
    localStorage.removeItem("ventasprevaloradas");
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




  



  SetVentasTodo(ventastodo: any) {
    localStorage.setItem("ventastodo",JSON.stringify(ventastodo));
  }
  GetVentasTodo():any[]{
    if(localStorage.getItem("ventastodo")){
      let ventastodo = localStorage.getItem("ventastodo")??'';
      return ventastodo ? JSON.parse(ventastodo) : [];
    }
    else
    return [];
  }
  StateVentasTodo():boolean{
    return localStorage.getItem("ventastodo")!==null;
  }
  ClearVentasTodo() {
    localStorage.removeItem("ventastodo");
  }


  SetVentasTodo3(ventastodo: any) {   ///esto e spara volver a setear todo
    const serializedVentasTodo = LocalStorageService.serializeWithoutCircular(ventastodo);
    localStorage.setItem("ventastodo", serializedVentasTodo);
 
  }

  
  static serializeWithoutCircular(obj: any): string {
    const seen = new WeakSet();

    function replacer(key: string, value: any) {
      if (key === 'hotRegisterer' || key === 'hyperformulaInstance') {
        return undefined; // Excluir propiedades específicas que puedan causar referencias circulares
      }

      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return undefined; // Evitar referencias circulares
        }
        seen.add(value);
      }
      return value;
    }

    return JSON.stringify(obj, replacer);
  }

}
