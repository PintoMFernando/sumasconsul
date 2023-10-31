import { Component, Input } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { VentatalonarioService } from 'src/app/services/ventatalonario.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-talonarioselectronicos',
  templateUrl: './talonarioselectronicos.component.html',
  styleUrls: ['./talonarioselectronicos.component.css'],
  
})

export class TalonarioselectronicosComponent {
  @Input() idpuntoventa: any;  
  constructor(private formBuilder: FormBuilder,
              public ventatalonarioService: VentatalonarioService,
 
    ){
      this.form = this.formBuilder.group({
        // Define tus campos y validaciones aquí
        contador: [0, Validators.required],
        factinicial: [0, Validators.required],
        factfinal: [0, [Validators.required]],
        observacion: ['', [Validators.required]],

        // Agrega más campos según tus necesidades
      });
    }

  numberOfForms: number = 0;
  formArray: FormGroup[] = [];
  Arraydetabla: any[] =[];
  //private hotRegisterer = new HotTableRegisterer();
  contador:number =0;
  factinicial: number=0;
  factfinal: number =0;
  monto: number =0;
  form: FormGroup;
  observacion: string ='';
  archivo: File | null = null;
  botonClickeado: boolean = false;
  botonguardar: boolean = true;
  

  ngOnInit(){
   
  }
 

  onUpload(event: any){
    
    for (let file of event.files) {
    this.archivo= file;
  } 
  this.botonClickeado = true;
  this.botonguardar= false;
  
  }
  
  onNumberOfFormsChange() {
    this.addForms();
  }

 
  addForms() {
    if(this.Arraydetabla.length ===0){ //pregunta si esta vacio
      this.crearmistablashandson();
    }
    else{
      if(this.numberOfForms > this.Arraydetabla.length ){ //es mayor al numero? osea quiere aumentar 
          this.crearmistablashandson();
      }
      else{
        this.Arraydetabla.pop();
        this.contador--;
        console.log("quiere quitar");
        
      }
    }
    
  }

crearmistablashandson(){
  this.Arraydetabla = [];
    for (let i = 0; i < this.numberOfForms; i++) {
      const form = this.formBuilder.group({
        field1: ['', Validators.required],
        field2: ['']
      });
      this.Arraydetabla.push(form);
    }

}

createForm(): FormGroup {
  return this.formBuilder.group({
    factinicial: [0, Validators.required],
    factfinal: [0, Validators.required],
    // Otras propiedades del formulario
  });
}

onSubmit(form: FormGroup) {
  if (form.valid) {
    // El formulario es válido, realiza acciones necesarias aquí
    console.log('Formulario válido:', form.value);
  } else {
    // El formulario es inválido, puedes mostrar mensajes de validación
    // o realizar acciones necesarias.
  }
}

async guardar(){
  const idventatalonario= uuidv4();
  console.log("factiniicial",this.factinicial);
  console.log("factfinal",this.factfinal);
  console.log("contador",this.monto);
  console.log("observacion",this.observacion);
  console.log("archivo",this.archivo);
  console.log("id",idventatalonario);
  //aqui llamaria al servicio
  //await this.ventatalonarioService.createVentatalonarioelectronico(idventatalonario,this.factinicial,this.factfinal,this.monto,this.idpuntoventa);
  //await this.ventatalonarioService.createVentatalonarioelectronicoarchivo(this.observacion,this.archivo,idventatalonario);
 
}


 
}

