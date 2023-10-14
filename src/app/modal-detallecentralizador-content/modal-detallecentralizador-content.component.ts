import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-detallecentralizador-content',
  templateUrl: './modal-detallecentralizador-content.component.html',
  styleUrls: ['./modal-detallecentralizador-content.component.css']
})
export class ModalDetallecentralizadorContentComponent {

  
  responsableSuma: string = '';
  fechaResponsableSuma: Date | null = null;

  responsableDeclaracion: string = '';
  fechaResponsableDeclaracion: Date | null = null;

  responsableLibro: string = '';
  fechaResponsableLibro: Date | null = null;

  responsableBancarizacion: string = '';
  fechaResponsableBancarizacion: Date | null = null;

  responsableCobro: string = '';
  fechaResponsableCobro: Date | null = null;

  montoCobro: number | null = null;
  observaciones: string = '';
 

 

}
