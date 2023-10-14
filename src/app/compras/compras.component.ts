import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import HyperFormula from 'hyperformula';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent { 
  
  
  showForm1 = false;
  showForm2 = false;
  showForm3 = false;

  submitForm(formNumber: number) {
    // Lógica para enviar el formulario según el número (1, 2 o 3) seleccionado
    console.log(`Formulario ${formNumber} enviado`);
  }

  
}
