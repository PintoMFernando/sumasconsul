import { Component } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
//import Handsontable from 'handsontable/base';
import { HotTableModule } from '@handsontable/angular';
@Component({
  selector: 'app-talonarioselectronicos',
  templateUrl: './talonarioselectronicos.component.html',
  styleUrls: ['./talonarioselectronicos.component.css'],
  
})
export class TalonarioselectronicosComponent {
  constructor(private formBuilder: FormBuilder,
 
    ){}

  numberOfForms: number = 0;
  formArray: FormGroup[] = [];
  
  //private hotRegisterer = new HotTableRegisterer();
  


  onUpload(){
    
  }

  


  onNumberOfFormsChange() {
    this.addForms();
  }

 
  addForms() {
    this.formArray = [];
    for (let i = 0; i < this.numberOfForms; i++) {
      const form = this.formBuilder.group({
        field1: ['', Validators.required],
        field2: ['']
      });
      this.formArray.push(form);
    }
  }


 
}
