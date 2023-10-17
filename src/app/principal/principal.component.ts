import { Component, OnInit } from '@angular/core';
import { ModalIVAContentComponent } from '../modal-iva-content/modal-iva-content.component';
import { DialogService } from 'primeng/dynamicdialog'
import { ModalIUEContentComponent } from '../modal-iue-content/modal-iue-content.component';
import { ActivatedRoute } from '@angular/router';
import { CentralizadormesService } from '../services/centralizadormes.service';
import { Centralizadormes } from '../models/centralizadormes.model';
import { EmpresaService } from '../services/empresa.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Empresa } from '../models/empresa.model';
import { ModalResumenmesContentComponent } from '../modal-resumenmes-content/modal-resumenmes-content.component';
import { Fecha } from '../infraestructura/fecha';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  mes: string="";
  idempresa: number = 0; 
  panelVisible = true; // Variable para controlar la visibilidad del panel
  idcentralizadormes: string="";
  numbers: number[] = [];
  checkboxsaldoivainput: boolean = false;
  checkboxsaldoiuenput: boolean = false;
  checkboxcomisioninput: boolean = false;
  checkboxivaimpuestosnainput: boolean = false;
  checkboxbalanceinput: boolean = false;
  centralizadormes: Centralizadormes = new Centralizadormes();
  empresadatos: Empresa = new Empresa(); //aqui estan los datos del backend
  saldoivacontenido: string ="";
  ivaimpuestoscontenido: string ="";
  comisioncontenido: string ="";
  balancecontenido:string ="";
  textoEditable: string="";
  editable: boolean = false; 
  datoscentralizadormes:any;
  inputcambio: boolean = false;
  inputiva:boolean = false;
  inputivaimpuestos: boolean = false;
  inputbalance: boolean = false;

mesletra:string= '';
 
  

   constructor(public dialogService: DialogService,
               private route: ActivatedRoute,
               public centralzadormesservice: CentralizadormesService,
               public dblocal: LocalStorageService,
               public empresaService: EmpresaService,
    
    ) { }
   
   
  
  ngOnInit() {                  //aqui llega los parametros enviados desde el centralizador mes e idempresa
    this.mes = this.route.snapshot.params['mes'];
    //this.idempresa = this.route.snapshot.params['idempresa'];
    this.idcentralizadormes = this.route.snapshot.params['idcentralizadormes'];
    this.centralizadormesCall();
    this.empresaCall();
    console.log("este es el ide",this.idempresa,this.mes,this.idempresa);

  }

  onBalanceChange(){
    console.log("asdasda");
    this.inputbalance=true;
   }
 
   onbalanceChange() {    ///desde aqui se cambia el valor de saldoiva y manda el ptach
     if (this.checkboxbalanceinput == false  &&  this.inputbalance==true) {
       this.inputbalance=false;
       //this.centralzadormesservice.patchmescentraliador(this.idcentralizadormes,this.saldoivacontenido);
       console.log('Valor actual del input comision:', this.balancecontenido);
     }
   }
 



  onsaldoIvaChange(){
   this.inputiva=true;
  }

  onsaldoivaChange() {    ///desde aqui se cambia el valor de saldoiva y manda el ptach
    if (this.checkboxsaldoivainput == false  &&  this.inputiva==true) {
      this.inputiva=false;
      this.centralzadormesservice.patchmescentraliador(this.idcentralizadormes,this.saldoivacontenido);
      console.log('Valor actual del input comision:', this.saldoivacontenido);
    }
  }


  onivaImpuestosnChange(){
    this.inputivaimpuestos=true;
  }

  onivaimpuestosnChange(){
    if (this.checkboxivaimpuestosnainput == false  && this.inputivaimpuestos==true) {
      this.inputivaimpuestos = false;
      this.centralzadormesservice.patchmescentraliadorivaimpuestos(this.idcentralizadormes,this.ivaimpuestoscontenido);
      console.log('Valor actual del input comision:', this.ivaimpuestoscontenido);
    }
    

  }



  onComisionChange(){
    this.inputcambio = true; //esta funcion detecta si hubo un cambio en el imput

  }
  oncomisionChange(){
    if (this.checkboxcomisioninput == false && this.inputcambio ==true) {
      this.inputcambio = false;
      this.centralzadormesservice.patchmescentralizadorcomision(this.idcentralizadormes,this.comisioncontenido);
      console.log('Valor actual del input comision:', this.comisioncontenido);
     
    }

  }

  centralizadormesCall(){
      this.centralzadormesservice.getCentralizadormesid(this.idcentralizadormes)
      .subscribe(
        (data: any) => {

          this.centralizadormes=data;
          console.log('son los datos de centralizadormes',this.centralizadormes);
        }    
       );
  }

  empresaCall(){
      

     
      
      this.empresadatos = this.dblocal.GetDatosEmpresa();
      this.empresadatos.mescierre;
         // this.empresadatos=data;
         console.log('nomnre del mssses', this.empresadatos.mescierre); 
          const nombreDelMes = Fecha.getMesesArray().find((mescierre) => mescierre.value === Number(this.empresadatos.mescierre))?.label; //esto combierte el numero del json a mes con nombre
          console.log('nomnre del mes',nombreDelMes); 
          if (nombreDelMes) {
            this.empresadatos.mescierre = nombreDelMes;
          } else {
            this.empresadatos.mescierre = 'Mes no válido';
          }
    
          if(this.empresadatos.planillas == true){
            //String(this.empresadatos.planillas) = 'Si'
          }else{
            //data.planillas = 'No';
          }
          
          
          
      console.log('son los datos de empresa',this.empresadatos);    
  }



  //MODAL DE SALDO IVA
  showDialogIVA() {
    
    const ref = this.dialogService.open(ModalIVAContentComponent, {
      header: 'Modal Header',
      width: '20%',
    });
  }
 //MODAL DE SALDO IUE
  showDialogIUE() {
    
    const ref = this.dialogService.open(ModalIUEContentComponent, {
      header: 'Modal Header',
      width: '20%',
    });
  }
  //MODAL DE COMISION
  showDialogComision() {
    
    const ref = this.dialogService.open(ModalIUEContentComponent, {
      header: 'Modal Header',
      width: '20%',
    });
  }

  resumenmes(){
    const ref = this.dialogService.open(ModalResumenmesContentComponent, {
      header: 'Resumen Mes',
      width: '50%',
    });

  }

 


}

