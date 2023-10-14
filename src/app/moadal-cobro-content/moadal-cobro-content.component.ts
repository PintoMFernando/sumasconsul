import { Component} from '@angular/core';
import { Pago } from '../infraestructura/pago';
import { DialogService,DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CobroService } from '../services/cobro.service';
import { ModalserviceService } from '../services/modalservice.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-moadal-cobro-content',
  templateUrl: './moadal-cobro-content.component.html',
  styleUrls: ['./moadal-cobro-content.component.css'],

})
export class MoadalCobroContentComponent {
  constructor(
    private dialogService: DynamicDialogConfig,
    public cobroservice : CobroService,
    public dialogServicee: DialogService, 
    public messageService: MessageService,
    private modalService: ModalserviceService,
    
    
  ){}
  ref: DynamicDialogRef | undefined;
  tipoPago: any ; // Valor predeterminado, puedes establecerlo según tus necesidades
  tiposDePago = Pago.getTiposArray(); 
  value: number | undefined;
 
  montoapagar: number=50;//esto rescatar de las sumas cuando ya este todo
  monto: number = 0;
  resppago: string ='';
  observacion: string ='';
  estado: number =0;
  respcobro: number= 1;
  
 
  ngOnInit() {
    // Simulando un cambio de estado cuando se carga el componente
    console.log("Aqui es ta el ID", this.dialogService.data.id); //aqui esta el ID
    
  }
  
  onSubmit(){
    console.log('Tipo de Pago:', this.tipoPago);
    console.log('Monto a Pagar:', this.montoapagar);
    console.log('Monto:', this.monto);
    console.log('Responsable de Pago:', this.resppago);
    console.log('Observacion:', this.observacion);
    console.log('Estado:', this.estado);

    console.log('Este es elo ID', this.dialogService.data.idcentralizadormes);
    

    if(this.monto==this.montoapagar){
           this.estado = 1; //1  ESTA PAGADO
    }
    if(this.monto < this.montoapagar){
      this.estado = 2;  //DOS FALTA COBRAR
    }
    if(this.monto > this.montoapagar){
      this.estado = 3;  //tres tiene saldo a cuenta   
    }
     
    this.cobroservice.postCobro(this.tipoPago.value,this.estado,this.monto,this.respcobro,this.observacion,this.dialogService.data.idcentralizadormes,this.resppago);
    this.modalService.closeModal(); //cierra el modal
    

  }


  
  cancelar(){ 

  }
  
  

}
