import { Component, Input } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { TalonarioElectronico } from 'src/app/models/talonarioelectronico.model';
import { TalonarioselectronicosService } from 'src/app/services/talonarioselectronicos.service';
import { VentatalonarioService } from 'src/app/services/ventatalonario.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-talonarioselectronicos',
  templateUrl: './talonarioselectronicos.component.html',
  styleUrls: ['./talonarioselectronicos.component.css'],
  
})

export class TalonarioselectronicosComponent {
  @Input() idmespuntoventasuma: any;  
  @Input() idpuntoventaactividad: any;  
  @Input() nombreactividad: any;  
  @Input()  parametroDelPadreidcentralizadormes: string='';  
  @Input()  index: any;  
  @Input()  indexexterior: any; 
  @Input() todotalonarios: any;
  constructor(private formBuilder: FormBuilder,
              public ventatalonarioService: VentatalonarioService,
              public archivoelectronicoService:TalonarioselectronicosService,
              public messageService: MessageService,
 
    ){
      this.evento = new File([],''); // Puedes asignar un valor por defecto o inicializarlo con el valor que necesites.
     
 
      }
    

    numberOfForms: any [] = [];
  formArray: FormGroup[] = [];
  
  

  contador:number =0;
  monto: number[] =[];
  idventatalonario: string[] =[];
  observacion: string[]=[];
  botonClickeado: boolean []= [];
  botonguardar: boolean = true;
  tipotalonario: number =3;
  factinicial: number[]=[];
  factfinal: number[]=[];
  evento: File ;
  Arraydetabla: any[] =[];
  Arraydetabla3: any ;
  Arraydetabla2: TalonarioElectronico[]=[];
  Arraydetabla4:TalonarioElectronico= new TalonarioElectronico;
  prueba: string = '';
  

  ngOnInit(){
   
  this.getTalonariosElectronicos();
   
  }

 async getTalonariosElectronicos(){
    
    this.Arraydetabla[this.index]= [];
    const source$ =  this.archivoelectronicoService.getTalonarioElctronicobusqueda(this.idpuntoventaactividad,this.idmespuntoventasuma,this.tipotalonario); 
    const data:any = await lastValueFrom(source$);
    if(data){
    this.Arraydetabla[this.index] =data;
    console.log("aqui esta le tamanio de mi array osea numberforms",this.Arraydetabla[this.index].length)
    this.numberOfForms[this.index]= this.Arraydetabla[this.index].length;
        for (let i = 0; i < this.Arraydetabla[this.index].length; i++) { 
           this.factinicial[i]=this.Arraydetabla[this.index][i].ventatalonario.factinicial;
           this.factfinal[i]=this.Arraydetabla[this.index][i].ventatalonario.factfinal;
           this.observacion[i]=this.Arraydetabla[this.index][i].observacion;
           this.monto[i]=this.Arraydetabla[this.index][i].ventatalonario.montototal;
           this.idventatalonario[i]= data.idventatalonario
          
         }
        
        }else{
          this.numberOfForms[this.index]=0
          
        }
       await this.actualizarTalonarios();
       
   /* (await this.archivoelectronicoService.getTalonarioElctronicobusqueda(this.idpuntoventaactividad,this.idmespuntoventasuma,this.tipotalonario)).subscribe({
      next: (data:any)=>{ 
        if(data){
        this.Arraydetabla[this.index] =data;
        for (let i = 0; i < this.Arraydetabla[this.index].length; i++) { 
           this.prueba = data[i].observacion;
           this.numberOfForms[i]= this.Arraydetabla[this.index].length;
           this.factinicial[i]=this.Arraydetabla[this.index][i].ventatalonario.factinicial;
           this.factfinal[i]=this.Arraydetabla[this.index][i].ventatalonario.factfinal;
           this.observacion[i]=this.Arraydetabla[this.index][i].observacion;
          
         }
        console.log("MI araya de tblas HOLOS xdxdxdxdxdxdx",this.Arraydetabla[this.index].length);
         console.log("MI araya de tblas xdxdxdxdxdxdx2",this.prueba);
        }
    
    },
      complete: () => { }, // completeHandler
      error: (error) => { console.log('Este es el error', error)},    
           
  });
   
  */
   
   

  }
  async onNumberOfFormsChange() {
    await this.actualizarTalonarios();
  }

  async actualizarTalonarios(){
   
    const cantidadFormularios = this.numberOfForms[this.index];
    const formulariosActuales = this.Arraydetabla[this.index].length;
    const ultimoValor = this.Arraydetabla[this.index][this.Arraydetabla[this.index].length-1]?.observacion; 
    console.log("que hay qui seraraasasdasdasdasd",ultimoValor)
    
    
    if (cantidadFormularios > formulariosActuales) {
     await this.crearmistablas(cantidadFormularios,formulariosActuales);
    }else if(cantidadFormularios< formulariosActuales){ //aqui quiere reducir 
         if(ultimoValor  ){ // tiene datos no quita tiene dato
          console.log("no puedes quitar fromulariopor que hay datos");//mandar mensaje 
          this.messageService.add({ severity: 'error', summary: 'CUIDADO ', detail: 'No se puede Quitar el Talonairo por que Hay datos en el ' });
         }else{
          this.Arraydetabla[this.index].pop()
         }
    }

   // await this.onNumberOfFormsChange();

  }
 

  onUpload(event: any,i:number){
    console.log("aqui esta mi event",event)
    this.evento = event.files[0];
    
  this.botonClickeado[i] = true;
  this.botonguardar= false;
  
  }
 
  //async onNumberOfFormsChange() {
  //  await this.addForms();
 // }

 
 /*async addForms() {
  console.log("que es eswto??/ ,i arrayadetaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdasdasdasabla????entraaaaaaaa???",this.Arraydetabla[this.index])
    if(this.numberOfForms){ //pregunta si esta vacio
      await this.crearmistablas();
      console.log(" no esta vacioooooooooooooooooooooooooooooooooooo ")
    }
    else{
      console.log(" esta vaciooooooooooooooooooooo ")
       //   await this.crearmistablashandson();
      
    }
    
  }*/

async crearmistablas(cantidad: number,valoaumentar:number){
  console.log("entra a crear mi tabla handsooooooooooooooooon")
  //this.Arraydetabla[this.index] = [];
    for (let i = valoaumentar; i < cantidad; i++) {
      const form = this.formBuilder.group({
        field1: ['', Validators.required],
        field2: ['']
      });
      this.Arraydetabla[this.index].push(form);
    }
 console.log("que es eswto??/ ,ixyz arrayadetabla????", this.Arraydetabla[this.index])
}




async guardar(index:number){

  console.log("AQUI ESTA MI ARRAY todo mi array??????", this.Arraydetabla[this.index])
  const source$ = this.archivoelectronicoService.getTalonarioElctronicobusqueda(this.idpuntoventaactividad,this.idmespuntoventasuma,this.tipotalonario); 
  const data:any = await lastValueFrom(source$);

  const idventatalonario= uuidv4();
  const jsondatostalonario={
   
      idventatalonario: idventatalonario,
      numtalonario: index+1,
      factinicial: Number(this.factinicial[index]),
      factfinal: Number(this.factfinal[index]),
      tipo: Number(this.tipotalonario),
      montototal: Number(this.monto[index]),
      idpuntoventaactividad:String(this.idpuntoventaactividad),
      idcentralizadormes:String(this.idmespuntoventasuma)
 

  }
  console.log("mi archivo",this.evento)
  console.log("mi observacion", this.observacion[index])
  console.log("mi idventalaotnaio",idventatalonario)


  const formDataelectronicos = new FormData();
  formDataelectronicos.append('idarchivotalonarioelectronico', uuidv4());
  formDataelectronicos.append('file', this.evento);
  formDataelectronicos.append('observacion', this.observacion[index]);
  formDataelectronicos.append('idventatalonario', idventatalonario);
  formDataelectronicos.append('filename', "gato");
  if(data){
    //no esta vacio borramos y creamos
   
    const idventatalonario= data.idventatalonario
    await this.archivoelectronicoService.deleteTalonarioElctronico(this.idpuntoventaactividad,this.idmespuntoventasuma,this.tipotalonario)
    await this.ventatalonarioService.createVentatalonario(jsondatostalonario);
    await this.archivoelectronicoService.createVentatalonarioelectronicoarchivo(formDataelectronicos);
    
  }
  else{
    //si esta vacio,creamos
    await this.ventatalonarioService.createVentatalonario(jsondatostalonario);
    await this.archivoelectronicoService.createVentatalonarioelectronicoarchivo(formDataelectronicos);
  }
  console.log("ENTRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA?")
  

  
  console.log("miPRIER JSON A GUARDAR", jsondatostalonario)
  
  console.log("MI SEGUNDO JSON A GUARDAR",  formDataelectronicos );

  
  
 
  
 
}


 
}

