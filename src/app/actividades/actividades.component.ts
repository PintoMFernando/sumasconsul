import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from '../services/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { PuntoventaService } from '../services/puntoventa.service';
import { Puntoventa } from '../models/puntoventa.model';
import { lastValueFrom } from 'rxjs';
import { ActividadesService } from '../services/actividades.service';
import { PuntoventaactividadService } from '../services/puntoventaactividad.service';

import { v4 as uuidv4 } from 'uuid';
import { puntoventaactividad } from '../models/puntoventaactividad.model';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ModalserviceService } from '../services/modalservice.service';
import { UpdatepuntoventaactividadComponent } from '../updatepuntoventaactividad/updatepuntoventaactividad.component';
@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
  providers: [MessageService],
})
export class ActividadesComponent {
  
  constructor(
    public dblocal: LocalStorageService,
    public empresaService: EmpresaService,
    public puntoventaService:PuntoventaService,
    public actividadesService :ActividadesService,
    public puntoventaactividadService: PuntoventaactividadService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    public modalService: ModalserviceService


) {
  


}

  campo1:string ="";
  empresa: Empresa = new Empresa();
  idempresa: number =0; 
  selectedOption1: string = '';
 
  actividadestipo:any[]=[];
  secciones:any[]=[];
  divisiones:any[]=[];
  // Define más variables para los selectores según tus necesidades

  formularioAdicionalVisible: boolean[] = [];
  //opcion: string = '';
  opcion: string[] = [];
  opcionseccion: number[] = [];
  opciondivision: number[] = [];
  //opcionseccion: number = 0;
  //opciondivision: number = 0;

  puntoventa: any []=[];
  deletebutton: any[]=[];
  patchbutton: any[]=[];
  


  ngOnInit(){
   // let id=Number(this.dblocal.GetDatosEmpresa().idempresa)
    this.empresa = this.dblocal.GetDatosEmpresa();
    this.idempresa=Number(this.empresa.idempresa); 
    this.getpuntoventa();
    this.getpuntoventaseccion();

   


  }
  async getpuntoventa(){
    this.puntoventa=[];
    const source$ =  this.puntoventaactividadService.getPuntoventaactividad(this.idempresa);
    const data:any = await lastValueFrom(source$);
    this.puntoventa=data;
    

    this.puntoventa.forEach(() => this.formularioAdicionalVisible.push(false));
    console.log("SON MIS DATOS EN DATA", this.puntoventa);
    console.log("VISIBLE", this.formularioAdicionalVisible);
   
   
    
  }

  async getpuntoventaseccion(){
  

    (await this.actividadesService.getActividadestipo()).subscribe({
      next: (data:any)=>{ 
        this.actividadestipo=data;
        
    
    },
      complete: () => { }, // completeHandler
      error: (error) => { console.log('Este es el error', error)},    
           
  });
  }

  async selecttipo(opcion:string,index:number){

       (await this.actividadesService.getActividadesseccion(opcion)).subscribe({
        next: (data:any)=>{ 
          this.secciones[index]=data; 
      },
        complete: () => { }, // completeHandler
        error: (error) => { console.log('Este es el error', error)}, 
         
       });
       

  }

  async selecSeccion(opcion:string,opcionseccion:number,index:number){
  
       (await this.actividadesService.getActividadesdivision(opcion,opcionseccion)).subscribe({
        next: (data:any)=>{ 
          this.divisiones[index]=data; 
      },
        complete: () => { }, // completeHandler
        error: (error) => { console.log('Este es el error', error)}, 
         
       });
       

  }

  async postactividad(opciondivision:number,index:number,idpuntoventa:any){
     
    this.formularioAdicionalVisible[index]=false;
    this.secciones[index]=[];
    this.divisiones[index]=[];

    console.log("idactividades", Number(opciondivision))
    console.log("idp", Number(idpuntoventa))
  const source$ = this.puntoventaactividadService.getPuntoventaactividadbusqueda(Number(opciondivision),Number(idpuntoventa)); 
  const data:any = await lastValueFrom(source$);
  console.log("mis datos data",data)
  const resultado = data.find((item: any) => item.idactividades === opciondivision &&  item.idpuntoventa === idpuntoventa);
    if(resultado){
        //hay ese dato ///mandar un  mensaje de que ya existe ese dato
        console.log("hay este dato",resultado);     
       
          this.messageService.add({ severity: 'error', summary: 'ERROR DE REGISTRO ', detail: 'Este Registro ya existe, Verifique' });
   
    }else{
      console.log("NOOO hay este dato",resultado); 
      const jsondatos={
        idpuntoventaactividad:uuidv4(),
        idactividades: opciondivision,
        idpuntoventa:idpuntoventa,
      }
     await  this.puntoventaactividadService.createPuntoventaactividad(jsondatos);
     await this.getpuntoventa();
      this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'La Actividad se creo con Exito' });
  
    }
     
  }
  
 
  
  // Variables para controlar la visibilidad de los formularios
  mostrarFormularioAdicionals: boolean = false;



 
  toggleFormularioAdicional() {
    this.mostrarFormularioAdicionals = !this.mostrarFormularioAdicionals;
  }

 

  mostrarFormularioAdicional(index:number) {
    this.formularioAdicionalVisible[index]= true; 
  }
 
  cerrarformulario(index:number){
    this.formularioAdicionalVisible[index]= false; 
    this.secciones[index]=[];
    this.divisiones[index]=[];

  }

  
  
  async confirmationdeleteActividad(index2:number,idactividades:number,idpuntoventa:number){
      await this.confirmationService.confirm({
            message: 'Esta seguro de Borrar Esta actividad?? Se perdera TODOS los datos, sumas, compras de talonarios',
            header: 'Confirmacion de eliminacion',
            icon: 'pi pi-exclamation-triangle',
            accept: async() => {
              await this.deleteActividad(index2,idactividades,idpuntoventa);
                    this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'La actividad se a Eliminado con exito' });
              await this.getpuntoventa();
            },
            reject: () => {
                      this.messageService.add({ severity: 'warn', summary: 'Cancelada', detail: 'Eliminacion Cancelada' });
                      
              }
          
        });
    

  }

  


   
  
  async deleteActividad(index2:number,idactividades:number,idpuntoventa:number){
    const source$ = this.puntoventaactividadService.getPuntoventaactividadbusqueda(Number(idactividades),Number(idpuntoventa)); 
    const data:any = await lastValueFrom(source$);
    console.log("mis datos data",data)
    const resultado = data.find((item: any) => item.idpuntoventa === idpuntoventa && item.idactividades === idactividades );
    const idpuntoventaactividad= String(resultado.idpuntoventaactividad)
    console.log("gatomiresultado",resultado); 
    console.log("mi idapuntoventaactividad",idpuntoventaactividad); 
    if(resultado){
             //eliminar this.
             await this.puntoventaactividadService.deletePuntoventaactividad(idpuntoventaactividad);
             await this.getpuntoventa();
    }else{
      //mandar mensaje de error
      console.log("mandar error"); 
    }

  }

    patchActividad(index2:number,idactividades:number,idpuntoventa:number){
    
        const data={
          header: 'Editar Servicio ',
          width: '50',
          height: '30%',
          data:{
            index2,idactividades,idpuntoventa
          }
        }
        this.modalService.openModal(data, UpdatepuntoventaactividadComponent);
      
      


  }

  deshabilitarActividad(index2:number,idactividades:number,idpuntoventa:number){
   
    //this.puntoventaactividadService.patchPuntoventaactividad()

  }


  
 

}
