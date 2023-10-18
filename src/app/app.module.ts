import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { PanelModule } from 'primeng/panel'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StyleClassModule} from 'primeng/styleclass';
import { PrimeIcons } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ModalIVAContentComponent } from './modal-iva-content/modal-iva-content.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ModalIUEContentComponent } from './modal-iue-content/modal-iue-content.component';
import { ModalcomisionContentComponent } from './modalcomision-content/modalcomision-content.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { HotTableModule } from '@handsontable/angular'; // Importa el módulo HotTableModule

import { registerAllModules } from 'handsontable/registry';
import Handsontable from 'handsontable/base';
import { TabViewModule } from 'primeng/tabview';
import { CentralizadorComponent } from './centralizador/centralizador.component';
import { TableModule } from 'primeng/table';
import { ServicioConexionService } from './services/servicio-conexion.service';
import { HttpClientModule } from '@angular/common/http';
import { MiAdaptadorPrimeNG } from './centralizador/primengadapter';
import { ModalcrearmesContentComponent } from './modalcrearmes-content/modalcrearmes-content.component';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmEventType } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TagModule } from 'primeng/tag';
import { MoadalCobroContentComponent } from './moadal-cobro-content/moadal-cobro-content.component';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ModalDetallecentralizadorContentComponent } from './modal-detallecentralizador-content/modal-detallecentralizador-content.component';
import { ModalObservacionesContentComponent } from './modal-observaciones-content/modal-observaciones-content.component';
import { ReactiveFormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { VentasComponent } from './ventas/ventas.component';
import { ComprasComponent } from './compras/compras.component';
import { OtrosComponent } from './otros/otros.component';
import { TalonariosventasComponent } from './ventas/talonariosventas/talonariosventas.component';
import { TalonariosprevaloradosComponent } from './ventas/talonariosprevalorados/talonariosprevalorados.component';
import { TalonarioselectronicosComponent } from './ventas/talonarioselectronicos/talonarioselectronicos.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ComprasnetasComponent } from './compras/comprasnetas/comprasnetas.component';
import { ComprasgasolinaComponent } from './compras/comprasgasolina/comprasgasolina.component';
import { Ice100Component } from './compras/ice100%/ice100.component';
import { ModalResumenmesContentComponent } from './modal-resumenmes-content/modal-resumenmes-content.component';
import { ListboxModule } from 'primeng/listbox';


registerAllModules();
@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    ModalIVAContentComponent,
    ModalIUEContentComponent,
    ModalcomisionContentComponent,
    CentralizadorComponent,
    ModalcrearmesContentComponent,
    MoadalCobroContentComponent,
    ModalDetallecentralizadorContentComponent,
    ModalObservacionesContentComponent,
    VentasComponent,
    ComprasComponent,
    OtrosComponent,
    TalonariosventasComponent,
    TalonariosprevaloradosComponent,
    TalonarioselectronicosComponent,
    ComprasnetasComponent,
    ComprasgasolinaComponent,
    Ice100Component,
    ModalResumenmesContentComponent,
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule, 
    ButtonModule,
    CascadeSelectModule, 
    CommonModule,
    ConfirmDialogModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    FormsModule,
    StyleClassModule,
    TabMenuModule,
    PanelMenuModule,
    PanelModule,
    HotTableModule,
    HttpClientModule,
    TabViewModule,
    TableModule,
    ToastModule,
    ConfirmPopupModule,
    TagModule,
    ReactiveFormsModule,
    FileUploadModule,
    ListboxModule,


    
  ],
  
  providers: [DialogService,ServicioConexionService,MiAdaptadorPrimeNG,ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
