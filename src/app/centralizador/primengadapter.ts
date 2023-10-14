import { Injectable } from '@angular/core';
import { Table } from 'primeng/table';

@Injectable()
export class MiAdaptadorPrimeNG {
  constructor() {}

  personalizarTabla(table: Table): void {
    
    // Personaliza la tabla según tus necesidades
    table.tableStyle = { 'min-width': '50rem' };
    table.styleClass = 'mi-clase-personalizada';
    
  }
}
