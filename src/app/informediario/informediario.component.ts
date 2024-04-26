import { Component } from '@angular/core';

@Component({
  selector: 'app-informediario',
  templateUrl: './informediario.component.html',
  styleUrls: ['./informediario.component.css']
})
export class InformediarioComponent {
  products!: any;
  panelItems: string[] = [];
  ngOnInit() {
    this.products = [
      { id: 1, nombre: 'Producto 1',codigo:'pc1' ,cantidad:10,precio: 10.99,total:5,fecha:'10/03/2024' },
      { id: 2, nombre: 'Producto 2',codigo:'pc2',cantidad:30,precio: 20.99 ,total:10,fecha:'11/03/2024'},
      { id: 3, nombre: 'Producto 3',codigo:'pc3',cantidad:60,precio: 30.99 ,total:20,fecha:'12/03/2024'},
      { id: 4, nombre: 'Producto 4',codigo:'pc4',cantidad:60,precio: 30.99 ,total:20,fecha:'12/03/2024'},
      { id: 5, nombre: 'Producto 5',codigo:'pc5',cantidad:60,precio: 30.99 ,total:20,fecha:'12/03/2024'},
      { id: 6, nombre: 'Producto 6',codigo:'pc6',cantidad:60,precio: 30.99 ,total:20,fecha:'12/03/2024'},
      { id: 7, nombre: 'Producto 7',codigo:'pc7',cantidad:60,precio: 30.99 ,total:20,fecha:'15/03/2024'},
    ];

  }

}
