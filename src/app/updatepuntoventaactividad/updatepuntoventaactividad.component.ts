import { Component } from '@angular/core';
import { ActividadesService } from '../services/actividades.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PuntoventaactividadService } from '../services/puntoventaactividad.service';
import { lastValueFrom } from 'rxjs';
import { ModalserviceService } from '../services/modalservice.service';

@Component({
  selector: 'app-updatepuntoventaactividad',
  templateUrl: './updatepuntoventaactividad.component.html',
  styleUrls: ['./updatepuntoventaactividad.component.css']
})
export class UpdatepuntoventaactividadComponent {

  constructor(
    public actividadesService :ActividadesService,
    private dialogService: DynamicDialogConfig,
    private puntoventaactividadService: PuntoventaactividadService,
    private modalService: ModalserviceService
) {
}


  opcion: string = "";
  opcionseccion: number = 0;
  opciondivision: number = 0;
  actividadestipo:any[]=[];
  secciones:any[]=[];
  divisiones:any[]=[];


    ngOnInit(){
   console.log("mi data??",this.dialogService.data.idactividades,this.dialogService.data.idpuntoventa)
   
    this.getpuntoventaseccion();

   


  }


  async getpuntoventaseccion(){
  

    (await this.actividadesService.getActividadestipo()).subscribe({
      next: (data:any)=>{ 
        this.actividadestipo=data;
        console.log("que hay aqui???",this.actividadestipo);
        
    
    },
      complete: () => { }, // completeHandler
      error: (error) => { console.log('Este es el error', error)},    
           
  });
  }

  async selecttipo(opcion:string){

       (await this.actividadesService.getActividadesseccion(opcion)).subscribe({
        next: (data:any)=>{ 
          this.secciones=data; 
      },
        complete: () => { }, // completeHandler
        error: (error) => { console.log('Este es el error', error)}, 
         
       });
       this. divisiones=[];

  }

  async selecSeccion(opcion:string,opcionseccion:number){
  
       (await this.actividadesService.getActividadesdivision(opcion,opcionseccion)).subscribe({
        next: (data:any)=>{ 
          this.divisiones=data; 
      },
        complete: () => { }, // completeHandler
        error: (error) => { console.log('Este es el error', error)}, 
         
       });
       

  }

  async editarActividad(idactividades:number){    //idactiviades no sirve
    console.log("mis asdasdasdadasda",idactividades,this.dialogService.data.idpuntoventa)
    const source$ = this.puntoventaactividadService.getPuntoventaactividadbusqueda(Number(this.dialogService.data.idactividades),Number(this.dialogService.data.idpuntoventa)); 
    const data:any = await lastValueFrom(source$);
    console.log("mis datos data",data)
    const resultado = data.find((item: any) => item.idpuntoventa === this.dialogService.data.idpuntoventa && item.idactividades === this.dialogService.data.idactividades);
    console.log("mi resultadoooooooooo",resultado)
    const idpuntoventaactividad= String(resultado.idpuntoventaactividad)
    console.log("mi dato",idpuntoventaactividad)
    const jsondatos ={
      idactividades:Number(idactividades)
    }
    console.log("asdasdasd",jsondatos);
   await this.puntoventaactividadService.patchPuntoventaactividad(idpuntoventaactividad,jsondatos);
   await this.modalService.enviarMensaje("holosactualizate"); //con esto actualiza actividades
   this.cerrarModal();

  }

  cerrarModal(){
    
    this.modalService.closeModal();
  }


}
