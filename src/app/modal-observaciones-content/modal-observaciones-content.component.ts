import { Component, ChangeDetectorRef } from '@angular/core';
import {  DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ObservacionesService } from '../services/observaciones.service';
import { Observaciones } from '../models/observaciones.model';
import { ModalserviceService } from '../services/modalservice.service';

@Component({
  selector: 'app-modal-observaciones-content',
  templateUrl: './modal-observaciones-content.component.html',
  styleUrls: ['./modal-observaciones-content.component.css']
})
export class ModalObservacionesContentComponent {
  observaciones: Observaciones = new Observaciones();
  nuevasobservaciones: any[] = [];
  idobservaciones: string='';
  constructor(
    private dialogService: DynamicDialogConfig,
    public observacionesService: ObservacionesService,
    private cdRef: ChangeDetectorRef,
    private modalService: ModalserviceService
  
  ){
  }

  elementos: string[] = []; // Lista de elementos
  nuevoElemento: string = ''; // Nuevo elemento a agregar
  elementoEditando: string | null = null; // Elemento que se está editando
  elementoEditandoTexto: string = ''; 

  ngOnInit(){
    this.callObservaciones();
     
     
    // console.log(this.nuevasobservaciones);
  }

  callObservaciones(){
    //console.log("Este es el idcentralizadormes",this.dialogService.data.idcentralizadormes);
   
    this.observacionesService.getObservaciones(this.dialogService.data.idcentralizadormes).subscribe(
      (data: any) => {
        // Suponiendo que 'data' tiene la misma estructura que el modelo 'Centralizadormes'
        this.nuevasobservaciones = [];
        for (let i = 0; i < data.length; i++) {
        this.observaciones = data[i];
        this.nuevasobservaciones.push(this.observaciones);
        this.idobservaciones = data[i].observacion;
        
       }
      }
      
     );

  }

  async agregarElemento() {
     
     await this.observacionesService.createObservacion(this.dialogService.data.idcentralizadormes,this.nuevoElemento);
     this.callObservaciones(); //cada vez que cree una nueva
 
  }

  editarElemento(obs: any) {
    obs.editando = true;
    //idobservaciones = true;
    //this.elementoEditandoTexto = this.elementos[index];
    //this.elementoEditando = this.elementos[index];
  }

  guardarEdicion(obs: any, observacion:string,idobservaciones: string) {
    
    obs.editando = false;
    console.log("aqui esta el nuevo dato",observacion);
    this.observacionesService.patchObservacion(idobservaciones,observacion)
  }

  cancelarEdicion(obs: any) {
    obs.editando = false;
  }


 async eliminarElemento(idobservaciones: string) {
    
   await  this.observacionesService.deleteObservaciones(idobservaciones);
   this.callObservaciones(); 
    
    
  }

  cerrarModal(){
    
    this.modalService.closeModal();
  }

}
