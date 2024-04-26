import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosComponent } from './productos/productos.component';
import { EntradasalidaComponent } from './entradasalida/entradasalida.component';
import { InformeComponent } from './informe/informe.component';
import { NewproductComponent } from './newproduct/newproduct.component';




const routes: Routes = [
  // Ingreso
  { path: 'login', component: WelcomeComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'entradasalida', component: EntradasalidaComponent },
  { path: 'informe', component: InformeComponent },
  { path: 'newproduct', component: NewproductComponent },
 // { path: '', redirectTo: '/login', pathMatch: 'full' },
 { path: '**', redirectTo: '' } // Redirecciona cualquier otra ruta a la principal

 // { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
