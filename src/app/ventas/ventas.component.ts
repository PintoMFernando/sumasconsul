import { Component, Input } from '@angular/core';
import { ModalserviceService } from '../services/modalservice.service';
import { ModalObservacionesContentComponent } from '../modal-observaciones-content/modal-observaciones-content.component';
import { PuntoventaService } from '../services/puntoventa.service';
import { LocalStorageService } from '../services/local-storage.service';
import { error } from 'jquery';
import { Puntoventa } from '../models/puntoventa.model';



@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  
  @Input() parametroDelPadreidcentralizadormes: string='';


  
  idempresaglobal:number=0;
  puntoventa: Puntoventa[]=[];

 

   
  constructor(private modalService:ModalserviceService,
              private puntoventaService: PuntoventaService,  
              private dblocal: LocalStorageService    
    ) { }


  ngOnInit(){
    console.log("holos datos aqui",this.dblocal.GetDatosEmpresa().idempresa);
    this.getPuntoVenta();
  }

  getPuntoVenta(){
  this.puntoventaService.getPuntoVenta(1593)
  .subscribe(
    (data: any) => {
      this.puntoventa=data;
         console.log("es el  data", data);
         console.log("es el modelo del data", this.puntoventa);
         console.log("es el  data nombre", data[0].nombre);
      
    }
    
   );
    
  }


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

  



