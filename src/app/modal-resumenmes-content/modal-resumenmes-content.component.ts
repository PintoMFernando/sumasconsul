import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-resumenmes-content',
  templateUrl: './modal-resumenmes-content.component.html',
  styleUrls: ['./modal-resumenmes-content.component.css']
})
export class ModalResumenmesContentComponent {
   countries:any=[];

  

    ngOnInit() {
        this.countries = [
            { name: 'Aqui entrara un comentario de Obervaciones de Todoasasdadasdasdasdasdasd', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];
    }

}
