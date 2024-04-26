import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  content: string = '';
  panelItems: string[] = [];
  salidas!: any;


  
  ngOnInit() {
    
    this.salidas = [
      {  nombre: 'Producto 1', fecha:'2/3/2024',codigo:'pc1' ,precio: 10.99,cantidad:12 },
      {  nombre: 'Producto 2', fecha:'2/3/2024',codigo:'pc2',precio: 20.99 ,cantidad:3},
      { nombre: 'Producto 3', fecha:'3/3/2024',codigo:'pc3',precio: 30.99 ,cantidad:4},
     
    ];

  }
  

  addToPanel() {
    if (this.content.trim() !== '') {
      this.panelItems.push(this.content);
      this.content = ''; // Limpia el campo de entrada después de agregar
    }
  }

  

}
