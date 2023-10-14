import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';

import { ModalcrearmesContentComponent } from '../modalcrearmes-content/modalcrearmes-content.component';
import { LocalStorageService } from './local-storage.service';
import { CentralizadormesService } from './centralizadormes.service';
import { Centralizadormes } from '../models/centralizadormes.model';
import { Subject } from 'rxjs';
import { ModalObservacionesContentComponent } from '../modal-observaciones-content/modal-observaciones-content.component';
import { ModalDetallecentralizadorContentComponent } from '../modal-detallecentralizador-content/modal-detallecentralizador-content.component';
@Injectable({
  providedIn: 'root'
})
export class ModalserviceService {
  private modalState = new BehaviorSubject<boolean>(false);
  private traerdatoState = new BehaviorSubject<boolean>(false);
  private dialogRef: any; 
   mess: any[] = [];
   mes: Centralizadormes = new Centralizadormes();
   private emisor = new Subject<any>();

  constructor(public dialogService: DialogService,
              private dbLocal: LocalStorageService,
              private centralizadormesService: CentralizadormesService,
              
              ) { }


  openModal(data:any, component: any) {
    this.dialogRef = this.dialogService.open(component, 
     data
     );
  }          
            
  // Método para cerrar el modal
  closeModal() {
    if (this.dialogRef) {
      this.dialogRef.close(); // Cierra el modal 
    }
  }

  traerDatos(anioActual:number){
    console.log("ESTE ES EL ANIO EN TRAER DATOS", anioActual);
    let id=Number(this.dbLocal.GetDatosEmpresa().idempresa)
    this.mess =[];
    this.centralizadormesService.getCentralizadormes(id,anioActual)
    
  .subscribe(
    (data: any) => {
    
      // Suponiendo que 'data' tiene la misma estructura que el modelo 'Centralizadormes'
      for (let i = 0; i < data.length; i++) {
      this.mes = data[i];
      this.mess.push(this.mes);
     }
    }
   );
  }

  
  enviarMensaje(mensaje: any) {
    console.log("entra la enviar mensaje");
    this.emisor.next(mensaje);
  }

  obtenerMensaje() {
    return this.emisor.asObservable();
  }



 

  // Observable para observar el estado del modal
  getModalState(): Observable<boolean> {
    return this.modalState.asObservable();
  }

  gettraerDatoState(): Observable<boolean>{
    return this.traerdatoState.asObservable();
  }
}
