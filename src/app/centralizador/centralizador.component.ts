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
  constructor(private empresaService: EmpresaService,
              private miAdaptadorPrimeNG: MiAdaptadorPrimeNG,
              public dialogService: DialogService,
              private modalService: ModalserviceService,
              private route: ActivatedRoute,
              private dbLocal:LocalStorageService,
              private centralizadorService: CentralizadorService,
              private centralizadormesService :CentralizadormesService,
              private cdRef: ChangeDetectorRef,   
              private userService: UserService,
              private empresadatosiniciales: EmpresadatosinicialesService,   
               
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
    
    //this.centralizadormesService.getCentralizadormesdatossucursales(this.)
    let id = Number(this.route.snapshot.paramMap.get('id'));  //este es el id global
    this.dbLocal.traerdatosempresalocalstorage(id); ///le pido datos al local storage
    this.item = this.dbLocal.GetDatosEmpresa();  //muestro mis datos del local
    this.empresadetalles(id);
   /* this.empresaService.getEmpresa(id).subscribe(data => {
       
      const nombreDelMes = Fecha.getMesesArray().find((mescierre) => mescierre.value === data.mescierre)?.label; //esto combierte el numero del json a mes con nombre
      //data.mescierre = nombreDelMes || 'Mes';

    this.dbLocal.SetDatosEmpresa(data);
    this.item = this.dbLocal.GetDatosEmpresa();
       if (this.datosTable) {
        this.miAdaptadorPrimeNG.personalizarTabla(this.datosTable);
      } else {
      console.error('La referencia datosTable es undefined.');
    }
    });
*/


    let iduser = Number(this.route.snapshot.paramMap.get('iduser'));  //este es el id global de user
    this.userService.getUser().subscribe(data => {
    this.dbLocal.SetUser(data);
    this.itemuser = this.dbLocal.GetUser();
    console.log("aquie stan el data de user",data);
       if (this.datosTable) {
        this.miAdaptadorPrimeNG.personalizarTabla(this.datosTable);
      } else {
      console.error('La referencia datosTable es undefined.');
    }
    });
    console.log("aquie stan el ID",id);
    console.log("aquie stan el ID",iduser);

     this.buscar(); 
     
     
  }
    
  
    ClickNuevoMes() {
      this.mess=[];
      console.log('entra nuevo mes');
      let id = Number(this.route.snapshot.paramMap.get('id'));
     const data={header: 'Crear Nuevo Mes',
           width: '20%',
          height: '40%',
         data:{
           anioActual: this.anioActual,
           id: id,
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

  buscar() {
      let id=Number(this.dbLocal.GetDatosEmpresa().idempresa)
      this.centralizadorService.getCentralizadormesbuscar(id,this.anioActual).subscribe({
        next: data=>{ 
           if(data ==null){ 
            console.log("No hay dato" ,this.ClickNuevoMes())
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
    console.log("entra a traer datos");
    let id=Number(this.dbLocal.GetDatosEmpresa().idempresa)
    this.mess =[];
    this.centralizadormesService.getCentralizadormes(id,this.anioActual)
  .subscribe(
    (data: any) => {
      // Suponiendo que 'data' tiene la misma estructura que el modelo 'Centralizadormes'
      console.log("es el data",data);
      for (let i = 0; i < data.length; i++) {
      this.mes = data[i];
      const nombreDelMes = Fecha.getMesesArray().find((mes) => mes.value === data[i].mes)?.label; //esto combierte el numero del json a mes con nombre
      data[i].mes = nombreDelMes || 'Mes no válido';
      //const fechaFormateada = data[i].fecha.transform('yyyy-MM-dd');
      this.mess.push(this.mes);
      this.idmes = data[i].idcentralizador;
     
      
     }
    }
    
   );
  await this.empresadetalles(id);
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
  const source$ = this.centralizadorService.getCentralizadormesbuscar(id,this.anioActual); //con esto traigo el id
  const data:any = await lastValueFrom(source$);
  this.idcentralizador=data.idcentralizador;
  console.log("entrasadasdasdasdsa", this.idcentralizador );
  this.empresadatosiniciales.getEmpresadatosiniciales(this.idcentralizador)
      .subscribe(
        (data: any) => {
          console.log("aqui esta le datasaaaaaaaaaaaaaaaaaaaaaa", data);
          this.datosinicalesempresa=data[0];
          if(data[0].planillas == true){
            data[0].planillas=this.planillas; 
         }else{
           this.planillas= 'No'
           data[0].planillas = this.planillas;
         }
    
 
   console.log("datosempresa inicialse", this.datosinicalesempresa);
        }    
       );
 }
 
}
