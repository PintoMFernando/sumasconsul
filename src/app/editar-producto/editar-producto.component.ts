import { ChangeDetectorRef, Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProductoService } from '../services/producto.service';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {

  idproducto:any;
  producto: string="";
  data:any;
  miProducto:any []=[];
  imagenSeleccionada: boolean = false;
  nombre: string="";
  evento: File ;
  

  constructor(
    public ref: DynamicDialogConfig,
    public productoService: ProductoService,
    private cdRef: ChangeDetectorRef, 
    private messageService: MessageService, 

  ){
    this.evento = new File([],'');
    
  }
  
 /* producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    codigo: ''
  };*/


  ngOnInit() {
    this.editarProducto();
    

    
  }

  async editarProducto(){

    this.idproducto=this.ref.data.idproducto;
    // this.data=await this.productoService.verProducto(this.idproducto)
     const source$ = this.productoService.editarProducto(this.idproducto); //con esto traigo el id
    const data:any = await lastValueFrom(source$);
    this.miProducto=data;
 
     console.log("traer mis datos?????",this.miProducto)
     console.log("traer mis datoasdasdasdas?????",data[0].nombre)
     this.cdRef.detectChanges();
 
 
  }


  

  submitForm() {
    console.log('Producto registrado:',this.miProducto);
    // Aquí podrías enviar los datos del producto a tu backend para su procesamiento y almacenamiento
  }


  async onUpload(event: any){
    //console.log("aqui esta mi event",event)
     this.evento = await event.files[0];
     this.imagenSeleccionada = true;
   //this.botonClickeado[i] = true;
   //this.botonguardar[i]= false;
   await this.messageService.add({ severity: 'success', summary: 'Exito!!', detail: 'Imagen Seleccionada Exitosamente ' });
  
  }


}
