import { Component, Input } from '@angular/core';
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
  
  @Input() parametroDelPadreidcentralizadormes: string='';

 
  ngOnInit(){
   console.log("aquie sta el idecentrlaizadores",this.parametroDelPadreidcentralizadormes);
  }

  
}
