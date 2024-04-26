import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent {

  
  products!: any;
  salidas!: any;
  algo:number =0;

  constructor(
    
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.products = [
      { id: 1, nombre: 'Producto 1', imagen:'imagen1',codigo:'pc1' ,precio: 10.99 },
      { id: 2, nombre: 'Producto 2', imagen:'imagen2',codigo:'pc2',precio: 20.99 },
      { id: 3, nombre: 'Producto 3', imagen:'imagen3',codigo:'pc3',precio: 30.99 }
    ];

    this.salidas = [
      {  nombre: 'Producto 1', fecha:'2/3/2024',codigo:'pc1' ,precio: 10.99,cantidad:12 },
      {  nombre: 'Producto 2', fecha:'2/3/2024',codigo:'pc2',precio: 20.99 ,cantidad:3},
      { nombre: 'Producto 3', fecha:'3/3/2024',codigo:'pc3',precio: 30.99 ,cantidad:4},
      { nombre: 'Producto 4', fecha:'3/3/2024',codigo:'pc4',precio: 50.99 ,cantidad:7}
    ];

  }

  agregarSalida(event: Event){
      this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Esta Seguro de Agregar este Producto?',
          header: 'Confirmacion',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon:"none",
          rejectIcon:"none",
          acceptLabel: 'Sí', 
          rejectLabel: 'No',
          rejectButtonStyleClass:"p-button-text",
          accept: () => {
              this.messageService.add({ severity: 'info', summary: 'Confirmado!!', detail: 'El Producto se Agrego hoy con Exito' });
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Cancelado!!', detail: 'Se Cancelo la Operacion', life: 3000 });
          }
      });
    

  }


}
