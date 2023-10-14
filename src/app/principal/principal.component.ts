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
  centralizadormes: Centralizadormes = new Centralizadormes();
  empresadatos: Empresa = new Empresa(); //aqui estan los datos del backend
  saldoivacontenido: string ="";
  ivaimpuestoscontenido: string ="";
  comisioncontenido: string ="";
  textoEditable: string="";
  editable: boolean = false; 
  datoscentralizadormes:any;
 
  

   constructor(public dialogService: DialogService,
               private route: ActivatedRoute,
               public centralzadormesservice: CentralizadormesService,
               public dblocal: LocalStorageService,
               public empresaService: EmpresaService,
    
    ) { }
   
   
  
  ngOnInit() {                  //aqui llega los parametros enviados desde el centralizador mes e idempresa
    this.mes = this.route.snapshot.params['mes'];
    this.idempresa = this.route.snapshot.params['idempresa'];
    this.idcentralizadormes = this.route.snapshot.params['idcentralizadormes'];
    this.centralizadormesCall();
    this.empresaCall();
    console.log("este es el ide",this.idempresa,this.mes,this.idempresa);

  }

  onsaldoivaChange() {    ///desde aqui se cambia el valor de saldoiva y manda el ptach
    if (this.checkboxsaldoivainput == false) {
      this.centralzadormesservice.patchmescentraliador(this.idcentralizadormes,this.saldoivacontenido);
      
    }
  }

  onivaimpuestosnChange(){
    if (this.checkboxivaimpuestosnainput == false) {
      this.centralzadormesservice.patchmescentraliadorivaimpuestos(this.idcentralizadormes,this.ivaimpuestoscontenido);
     
    }
    

  }
  oncomisionChange(){
    if (this.checkboxcomisioninput == false) {
    
      this.empresaService.patchmescentralizadorcomision(this.idempresa,this.comisioncontenido);
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
      

      this.empresaService.getEmpresa(this.idempresa).subscribe(
        (data: any) => {
         
          this.empresadatos=data;
          const nombreDelMes = Fecha.getMesesArray().find((mescierre) => mescierre.value === Number(data.mescierre))?.label; //esto combierte el numero del json a mes con nombre
          data.mescierre = nombreDelMes || 'Mes no válido';

          if(data.planillas == true){
            data.planillas = 'Si'
          }else{
            data.planillas = 'No';
          }
          
        }    
       );
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

