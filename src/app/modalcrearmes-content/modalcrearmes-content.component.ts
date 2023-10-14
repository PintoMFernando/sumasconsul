import { Component,OnInit  } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalserviceService } from '../services/modalservice.service';
import { Observable } from 'rxjs';
import { NuevomesService } from '../services/nuevomes.service';
import { DatoSelect } from '../infraestructura/Datos';
import { Fecha } from '../infraestructura/fecha';
import { CentralizadorService } from '../services/centralizador.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-modalcrearmes-content',
  templateUrl: './modalcrearmes-content.component.html',
  styleUrls: ['./modalcrearmes-content.component.css'],
  providers: [ConfirmationService,MessageService] 
})
export class ModalcrearmesContentComponent implements OnInit {
  modalState: Observable<boolean>;
  traerdatoState: Observable<boolean>;
  anioActual: number=0;
  id: number=0;
  idglobal:number=0
  
  meses: DatoSelect[] = [];
  mesSeleccionado: number = 0; // Asignar un valor por defecto, por ejemplo, 1 para enero
  private dialogRef: any;
  
  
  
constructor(private confirmationService: ConfirmationService,
            private messageService: MessageService,
            private modalService: ModalserviceService,
            private mesnuevo: NuevomesService,
            private centralizadorService: CentralizadorService,
            private localdb: LocalStorageService,
            public ref: DynamicDialogConfig
            ) {
  
  this.modalState = this.modalService.getModalState();
  this.traerdatoState = this.modalService.gettraerDatoState();
  this.meses =Fecha.getMesesArray();
  

}
  ngOnInit(): void {
    this.anioActual = this.ref.data.anioActual;
    this.id = this.ref.data.id;
  }


closeModal() {
  this.modalService.closeModal();  //cierra el modal
}


aceptarModal(){
  this.localdb.GetDatosEmpresa().idempresa //esto contiene la variable global no olvidar localestorage
          this.messageService.add({ severity: 'info', summary: 'Confirmado!', detail: 'Mes Creado Con exito' });
          this.modalService.closeModal();
          this.crearmes();
          this.mesnuevo.nuevoMes(this.mesSeleccionado); 
          //this.modalService.traerDatos(this.anioActual);
          console.log("entra a enviar emnsaje");
          this.modalService.enviarMensaje('que se ejecute');//Esto envia el mensaje para que se ejecute la funcion

}


async crearmes(){
  await this.centralizadorService.postCentralizador(this.id,this.anioActual);
  this.actualizar();
}


 actualizar(){
  this.modalService.enviarMensaje('que se ejecute');
}
}