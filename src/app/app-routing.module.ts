import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { AppComponent } from './app.component';
import { CentralizadorComponent } from './centralizador/centralizador.component';
import { MoadalCobroContentComponent } from './moadal-cobro-content/moadal-cobro-content.component';




const routes: Routes = [{
  path:'',
  component:AppComponent,
  children:[
  { path: '', redirectTo: '/centralizador', pathMatch: 'full' }, // Redireccionar a la página de inicio
  { path: 'centralizador/:id', component: CentralizadorComponent },
  { path: 'principal/:idempresa/:anioActual/:mes/:idcentralizadormes', component: PrincipalComponent },
  
  
 
  
  ]
}];







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
