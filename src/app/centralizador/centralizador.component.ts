import { ChangeDetectorRef, Component, OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MiAdaptadorPrimeNG } from './primengadapter';
import { Table } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog'
import { ModalserviceService } from '../services/modalservice.service'
import { Empresa } from '../models/empresa.model';
import { Centralizador } from '../models/centralizador.model';
import { EmpresaService } from '../services/empresa.service';
import { LocalStorageService } from '../services/local-storage.service';
import { CentralizadorService } from '../services/centralizador.service';
import { CentralizadormesService } from '../services/centralizadormes.service';
import { Centralizadormes } from '../models/centralizadormes.model';
import { Subscription } from 'rxjs';
import { error } from 'jquery';
import { Fecha } from '../infraestructura/fecha';
import { MoadalCobroContentComponent } from '../moadal-cobro-content/moadal-cobro-content.component';
import { ModalDetallecentralizadorContentComponent } from '../modal-detallecentralizador-content/modal-detallecentralizador-content.component';
import { ModalObservacionesContentComponent } from '../modal-observaciones-content/modal-observaciones-content.component';
import { ModalcrearmesContentComponent } from '../modalcrearmes-content/modalcrearmes-content.component';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { EmpresadatosinicialesService } from '../services/empresadatosiniciales.service';
import { Empresadatosiniciales } from '../models/empresadatosiniciales.model';
import { lastValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-centralizador',
  templateUrl: './centralizador.component.html',
  styleUrls: ['./centralizador.component.css'],
  providers: [MiAdaptadorPrimeNG]
})
export class CentralizadorComponent implements OnInit{  
  @ViewChild('datosTable') datosTable!: Table;
  item: Empresa = new Empresa(); //aqui estan los datos del backend
  datosinicalesempresa: Empresadatosiniciales = new Empresadatosiniciales(); 
  itemuser: User = new User();
  filasTabla: any[] = []; //con esto se crea la nueva fila
  mesSeleccionado: number= 0;
  visible: boolean = false; ///modal de observaciones
  anios: number []=[];
  anioActual: number=0;
  anioSeleccionado: number = 0
  centralizador: Centralizador = new Centralizador(); 
  filasmes: Centralizadormes[]=[];
  mes: Centralizadormes = new Centralizadormes();
  mess: any[] = [];
  mensaje: string = '';
  suscripcion: Subscription;
  idmes: string='';
  dialogRef: any; 
  backgroundColor: string = 'white'; //esto pinta el color de la celda para poner blanco, amarillo, o verde terminado
  backgroundColorPago: string = 'white'; //esto es el color de fondo de cobro-pago
  planillas: any='Si';
  idcentralizador: string ="";
  idempresa: number=0;
  datosmes:any;
  empresadatosdetalles:any;
 
  constructor(
              public dialogService: DialogService,
              private modalService: ModalserviceService,
              private route: ActivatedRoute,
              private dbLocal:LocalStorageService,
              private centralizadorService: CentralizadorService,
              private cdRef: ChangeDetectorRef,   
                
               
    ) { 
      this.generarAnios();

      this.suscripcion = this.modalService.obtenerMensaje().subscribe((mensaje) => {
        console.log("concluye el mensaje");
      this.traerdatos();
      this.cdRef.detectChanges();
      this.mensaje = mensaje;
      console.log(mensaje);
      });
 
      
       
  
    }

  ngOnInit(): void {
    this.idempresa = Number(this.route.snapshot.paramMap.get('id'));

    this.dbLocal.traerdatosempresalocalstorage(this.idempresa); ///le pido datos al local storage
    this.item = this.dbLocal.GetDatosEmpresa();  //muestro mis datos del local
    this.empresadetalles(this.idempresa);
  

    let iduser = Number(this.route.snapshot.paramMap.get('iduser'));  //este es el id global de user
    this.dbLocal.traerdatosuserlocalstorage(iduser);
    this.itemuser = this.dbLocal.GetUser();
    
     this.buscar(); 
     
     
  }
    
  
    ClickNuevoMes() {
      this.mess=[];
     const data={header: 'Crear Nuevo Mes',
           width: '20%',
          height: '40%',
         data:{
           anioActual: this.anioActual,
           id: this.idempresa,
          }
   }
      this.modalService.openModal(data, ModalcrearmesContentComponent); //abre el modal "modalcrearmes-content"  
        
    }

    
  generarAnios(){
    this.anioActual = new Date().getFullYear();
    for (let anio = 2013; anio <= 2033; anio++) {
      this.anios.push(anio);
    }
  }

  onAnioChange() {
    ///aqui preguntar si el anio ya existe en la db
    this.buscar();
    console.log(this.anioActual); // Esto contiene el anio que cambiar y muestra en consola
    
  }

  async buscar() {
      await this.centralizadorService.getCentralizadormesbuscar(this.idempresa,this.anioActual).subscribe({
        next: data=>{ 
           if(data ==null){ 
            console.log("No hay dato" ,   this.ClickNuevoMes())
          }
            else{
              console.log("Ya hay datos",this.traerdatos())
            }
      
      },
        complete: () => { }, // completeHandler
        error: () => { console.log('Este es el error', error),this.showDialog },    
             
    });
  
  }
  
  showDialog() {
    this.visible = true;         // hace visible al modal de del observaciones
  }

  async  traerdatos(){
    this.mess =[];
    await this.dbLocal.traerdatoscentralizadorlocalstorage(this.idempresa,this.anioActual);
    this.datosmes = this.dbLocal.GetCentralizador();
   
      for (let i = 0; i < this.datosmes.length; i++) {
      this.mes = this.datosmes[i];
      const nombreDelMes = Fecha.getMesesArray().find((mes) => mes.value === this.datosmes[i].mes)?.label; //esto combierte el numero del json a mes con nombre
      this.datosmes[i].mes = nombreDelMes || 'Mes no válido';
      
      this.mess.push(this.mes);
      
     }
   
  await this.empresadetalles(this.idempresa);
  }

openModalCobro(idcentralizadormes: string){
     const data = {header: 'Cobro ',
     width: '35%',
     height: '60%',
     data:{
       idcentralizadormes  ,
     }}
  this.modalService.openModal(data,MoadalCobroContentComponent);
}
closeModal() {
    console.log("entra para cerrar");
  if (this.dialogRef) {
    this.dialogRef.close(); // Cierra el modal
  }
}

openModalDetalleCentralizador(){
  const data={
    header: 'Detalles Centralizador ',
    width: '35%',
    height: '60%',
  }
  this.modalService.openModal(data, ModalDetallecentralizadorContentComponent);
}

openObservaciones(idcentralizadormes:string){
  //console.log(idcentralizadormes);
  const data={
    header: 'Observaciones ',
    width: '35%',
    height: '60%',
    data:{
      idcentralizadormes  ,
    }
  }
  this.modalService.openModal(data, ModalObservacionesContentComponent);
}


 async empresadetalles(id:number){
  this.idcentralizador = this.dbLocal.GetCentralizador()[0].idcentralizador;
  this.dbLocal.traerdatosempresadetalleslocalstorage(this.idcentralizador)
  this.empresadatosdetalles= this.dbLocal.GetEmpresadetalles();
        
          this.datosinicalesempresa=this.empresadatosdetalles[0];
          if(this.empresadatosdetalles[0].planillas == true){
            this.empresadatosdetalles[0].planillas=this.planillas; 
         }else{
           this.planillas= 'No'
           this.empresadatosdetalles[0].planillas = this.planillas;
         }    
 }
 
}
