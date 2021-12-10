import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { ConsolidadoComponent } from './componentes/consolidado/consolidado.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'ventas', component: VentasComponent},
  { path: 'reportes', component: ReportesComponent},
  { path: 'consolidado', component: ConsolidadoComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
