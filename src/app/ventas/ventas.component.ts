import { Component, Input } from '@angular/core';
import { ModalserviceService } from '../services/modalservice.service';
import { ModalObservacionesContentComponent } from '../modal-observaciones-content/modal-observaciones-content.component';



@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  @Input() parametroDelPadreidcentralizadormes: string='';

   
  constructor(private modalService:ModalserviceService) { }


  observaciones(){
     this.callObservaciones(this.parametroDelPadreidcentralizadormes);
  }

  callObservaciones(idcentralizadormes:string){
    const data={
    header: 'Observaciones ',
    width: '35%',
    height: '60%',
    data:{
      idcentralizadormes
    }
  }
  this.modalService.openModal(data, ModalObservacionesContentComponent);
}
  }

  



