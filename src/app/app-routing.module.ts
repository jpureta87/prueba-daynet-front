import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';



const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ListadoClientesComponent },
  { path: 'clientes/:id', component: DetalleClienteComponent },
  { path: 'add', component: CrearClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
