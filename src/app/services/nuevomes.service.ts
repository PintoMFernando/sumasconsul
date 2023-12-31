import { Injectable,EventEmitter  } from '@angular/core';
import { CentralizadorComponent } from '../centralizador/centralizador.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NuevomesService {
  public crearFilaEvent: EventEmitter<number> = new EventEmitter<number>();

  numero:any=[];
  datos={};
  constructor() {}

  // Llamar a este método cuando se quiera ejecutar la función crearFila en Centralizador
  ejecutarCrearFila(mesSeleccionado: number) {
    this.crearFilaEvent.emit(mesSeleccionado);
    
  }

  nuevoMes(mesSeleccionado:number) { //dato: any
    
    this.ejecutarCrearFila(mesSeleccionado);
  }

  talonarios(numeros:any){
    this.datos={
      numeros:numeros
    };

    this.numero.push(this.datos);
    console.log("Aquie estan los datos",this.numero);

  }
  


}
