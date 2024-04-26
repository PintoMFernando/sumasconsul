import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-informemensual',
  templateUrl: './informemensual.component.html',
  styleUrls: ['./informemensual.component.css']
})
export class InformemensualComponent {
  products!: any;


  panelItems: string[] = [];
  anios: any [] = [];
  selectedAnio: string | undefined;

  mes: any [] = [];
  selectedMes: string | undefined;


  ngOnInit() {
    

    this.anios = [
      { anio: '2024' },
      { anio: '2025' },
      { anio: '2026' },
      { anio: '2027' },
      { anio: '2028' },
      { anio: '2029' },
      { anio: '2030' },
      { anio: '2031' },
      { anio: '2032' },
      { anio: '2033' },
      { anio: '2034' },
      { anio: '2035' },
      { anio: '2036' },
      { anio: '2037' },
      { anio: '2038' },
      { anio: '2039' },
      { anio: '2040' },

      
  ];
  this.mes = [
    { mes: 'Enero' },
    { mes: 'Febrero' },
    { mes: 'Marzo' },
    { mes: 'Abril' },
    { mes: 'Mayo' },
    { mes: 'Junio' },
    { mes: 'Julio' },
    { mes: 'Agosto' },
    { mes: 'Septiembre' },
    { mes: 'Octubre' },
    { mes: 'Noviembre' },
    { mes: 'Diciembre' },
   
];

    
  }

}
