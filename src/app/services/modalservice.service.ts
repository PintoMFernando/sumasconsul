import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
@Injectable({
  providedIn: 'root'
})
export class ModalserviceService {
  private modalState = new BehaviorSubject<boolean>(false);

  private dialogRef: any; 
  private emisor = new Subject<any>();

  constructor(public dialogService: DialogService,) {

   }


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

  getModalState(): Observable<boolean> {
    return this.modalState.asObservable();
  }


  enviarMensaje(mensaje: any) {
    // console.log("entra la enviar mensaje");
     this.emisor.next(mensaje);
   }

   obtenerMensaje() {
    return this.emisor.asObservable();
  }

 


}
