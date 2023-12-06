import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrizventasService {
  matrizLocalstorage: any[][] = [];
   matrizLocalstorageidventatalonario: any = []; //este estoy mqanejadno con su id de mimes y puntoventaactividad
   matrizLocalstorageidventatalonarioprevalorado: any = [];
  datosencabezados:any [] =[1,1];

  datosencabezadoscrear:any [][] =[[1,2],[1,2]];




   arraycabecera:any =[];
   arraycabeceratodo:any =[1,1];
   misencabezados:any = [];

  jsonDatosArray:any = [];
  jsonDatossumasArray:any = [];
  arrayTabla :any[]=[];
  conteo:number=0;

  constructor() { this.conteo=0; }

 
}
