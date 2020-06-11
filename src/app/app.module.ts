import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    CrearClienteComponent,
    DetalleClienteComponent,
    ListadoClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
