import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';

import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { ProductoService } from '../services/producto.service';
import { v4 as uuidv4 } from 'uuid';
import { ModalserviceService } from '../services/modalservice.service';
import { Observable } from 'rxjs';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent {

  modalState: Observable<boolean>;
  
  constructor(
    private messageService: MessageService, 
    public productoService: ProductoService,
    private modalService: ModalserviceService,
  

  ) {
    this.evento = new File([],'');
    this.modalState = this.modalService.getModalState();
  }

  imagenSeleccionada: boolean = false;
  conteoProducto: any;

  evento: File ;
 producto = {
  idproducto:uuidv4(),
  nombre: '',
  descripcion: '',
  precio: '0',
  codigo: '',
  stock:'0',
};


ngOnInit() {
  this.obtenerNumeroProductos();
}

async obtenerNumeroProductos(){
  try {
    this.conteoProducto = await this.productoService.cantidadProductos();
    console.log("hay conteo o no?", this.conteoProducto);
  } catch (error) {
    console.error("Error al obtener el conteo de productos:", error);
  }

}


async onUpload(event: any){
  //console.log("aqui esta mi event",event)
   this.evento = await event.files[0];
   this.imagenSeleccionada = true;
 //this.botonClickeado[i] = true;
 //this.botonguardar[i]= false;
 await this.messageService.add({ severity: 'success', summary: 'Exito!!', detail: 'Imagen Seleccionada Exitosamente ' });

}

async submitForm() {

  const formDataelectronicos = new FormData();
  formDataelectronicos.append('idproducto', uuidv4());
  formDataelectronicos.append('image', this.evento);
  formDataelectronicos.append('nombre', this.producto.nombre);
  formDataelectronicos.append('descripcion', this.producto.descripcion);
  formDataelectronicos.append('precio', this.producto.precio);
  formDataelectronicos.append('codigo', "PD"+this.conteoProducto+1);
  formDataelectronicos.append('stock', this.producto.stock);
  //formDataelectronicos.append('filename', "gato");

  

  console.log('Producto registradooo454:', this.producto);
  try {
    const response = await this.productoService.createproducto(formDataelectronicos);
    await this.messageService.add({ severity: 'info', summary: 'Confirmado!', detail: 'Producto Creado Con exito' });
    await  this.modalService.closeModal();
    await this.modalService.enviarMensaje('que se ejecute');
    console.log('Respuesta del backend:', response);
    console.log('Respuesta entra a mi archivo:', this.evento);

    // Aquí puedes manejar la respuesta del backend, por ejemplo, mostrar un mensaje al usuario
  } catch (error) {
    console.error('Error al llamar al servicio:', error);
    // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
  }
}







}
