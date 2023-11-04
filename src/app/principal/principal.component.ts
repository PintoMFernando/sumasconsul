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
import { EmpresadatosinicialesService } from '../services/empresadatosiniciales.service';
import { Empresadatosiniciales } from '../models/empresadatosiniciales.model';
import { Observable, combineLatest } from 'rxjs';
import { CentralizadorService } from '../services/centralizador.service';
import { lastValueFrom, take } from 'rxjs';
import { MespuntoventasumaService } from '../services/mespuntoventasuma.service';


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
  checkboxtrabajoinput: boolean = false;
  centralizadormes: Centralizadormes = new Centralizadormes();
  empresadatos: Empresa = new Empresa(); //aqui estan los datos del backend
  saldoivacontenido: string ="";
  ivaimpuestoscontenido: string ="";
  comisioncontenido: string ="";
  balancecontenido:string ="";
  trabajocontenido:string ="";
  textoEditable: string="";
  editable: boolean = false; 
  datoscentralizadormes:any;
  inputcambio: boolean = false;
  inputiva:boolean = false;
  inputivaimpuestos: boolean = false;
  inputbalance: boolean = false;
  inputtrabajo: boolean = false;
  planillas: any='Si';
mesletra:string= '';
datosinicalesempresa: Empresadatosiniciales = new Empresadatosiniciales();
idempresadatosiniciales: string="";
trabajo2:number=0;
balance2:number=0;
 total:number=0;
 anioactual :string ='';
 idcentralizador :string ="";
 planillasvalor: boolean = false;
 planillascontenido:boolean =false;
 


   constructor(public dialogService: DialogService,
               private route: ActivatedRoute,
               public centralzadormesservice: CentralizadormesService,
               public dblocal: LocalStorageService,
               public empresaService: EmpresaService,
               public empresadetallee : EmpresadatosinicialesService,
               public centralizadorService: CentralizadorService,
               public mespuntoventasumaService: MespuntoventasumaService,
    
    ) {
          
     }
   
   
   
  ngOnInit() {                  //aqui llega los parametros enviados desde el centralizador mes e idempresa
    this.idcentralizadormes = this.route.snapshot.params['idcentralizadormes'];
    
    this.anioactual = this.route.snapshot.params['anioActual'];
    console.log("es el anio actual", this.anioactual);
    this.mes = this.route.snapshot.params['mes'];
    //this.idempresa = this.route.snapshot.params['idempresa'];
    
    this.centralizadormesCall();
    this.empresaCall();
    this.empresadetalle();
    console.log("este es el ide",this.idempresa,this.mes,this.idempresa);
    console.log("este es el id de CENTRALIZADOR?????",this.idcentralizadormes);
    console.log('Valor actual del input trabajo:', this.balancecontenido);
    console.log('Valor actual del input trabajo:', this.trabajocontenido);
  }

  valorPlanillas(){
    this.planillasvalor = !this.planillasvalor; // Cambiar el valor true/false
  
  }


  onTrabajoChange(){
    console.log("asdasda");
    this.inputtrabajo=true;
    
   }
 
   ontrabajoChange() {    ///desde aqui se cambia el valor de saldoiva y manda el ptach
     if (this.checkboxtrabajoinput == false  &&  this.inputtrabajo==true) {
      
         
      this.total=Number(this.balance2)+Number(this.trabajocontenido)
       this.inputtrabajo=false;
       this.empresadetallee.patchEmpresadatosinicialtrabajo(this.idempresadatosiniciales,this.trabajocontenido);
       //this.centralzadormesservice.patchmescentraliador(this.idcentralizadormes,this.saldoivacontenido);
       console.log('Valor actual del input comision:', this.trabajocontenido);
     }
   }
 



  onBalanceChange(){
    console.log("asdasda");
    this.inputbalance=true;
   }
 
   onbalanceChange() {    ///desde aqui se cambia el valor de saldoiva y manda el ptach
     if (this.checkboxbalanceinput == false  &&  this.inputbalance==true) {
       this.total=Number(this.balancecontenido)+Number(this.trabajo2)
       this.inputbalance=false;
       this.empresadetallee.patchEmpresadatosinicialbalance(this.idempresadatosiniciales,this.balancecontenido);
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
  
  async empresadetalle(){
     
    let id=Number(this.dblocal.GetDatosEmpresa().idempresa)
    console.log("HOLOS EMWETRA A EMPRESA DETALLE",id);

    const source$ = this.centralizadorService.getCentralizadormesbuscar(id,Number(this.anioactual)); //con esto traigo el id
  const data:any = await lastValueFrom(source$);
  this.idcentralizador=data.idcentralizador;

  this.empresadetallee.getEmpresadatosiniciales(this.idcentralizador)
  .subscribe(
    (data: any) => {
      
      this.total=data[0].total;
      this.idempresadatosiniciales=data[0].idempresadatosiniciales;
    
      this.datosinicalesempresa=data[0];
      if(data[0].planillas == true){
        data[0].planillas=this.planillas; 
     }else{
       this.planillas= 'No'
       data[0].planillas = this.planillas;
     }
     this.trabajo2=data[0].trabajo;
     this.balance2=data[0].balance;
     console.log("aqui esta le data", data);
    
     console.log("datosempresa inicialse", this.datosinicalesempresa);
    }    
   );
}
 




}

