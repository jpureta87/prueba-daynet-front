import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../cliente';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {

  listadoClientes: Cliente[];
  clienteActual: Cliente;
  indiceActual: number;
  idBuscar: number;
  clienteBuscado: Cliente;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {

    this.listadoClientes = [];
    this.listarTodos();
    this.clienteActual = null;
    this.indiceActual = -1;
    this.idBuscar = null;
  }

  listarTodos() {
    this.clienteService.listarTodos().subscribe(response => {
      this.listadoClientes = response;
    }, error => {
      this.listadoClientes = [];
    });
  }

  setClienteActual(cliente: Cliente, indice: number) {
    this.clienteActual = cliente;
    this.indiceActual = indice;
  }

  buscarPorId() {
    console.log(this.idBuscar);
    if (this.idBuscar !== null && this.idBuscar !== +'') {
      this.clienteService.buscarPorId(this.idBuscar).subscribe(response => {
        this.clienteBuscado = response;
        this.listadoClientes = [];
        this.listadoClientes.push(this.clienteBuscado);
      }, error => {
        Swal.fire('No encontrado!', 'No existe un cliente registrado con el ID ' + this.idBuscar + '!', 'error');
      });
    } else {
      Swal.fire('Error!', 'Escriba el ID para buscar', 'error');
    }
  }

  borrarTodos() {
    Swal.fire({
      title: 'Borrar Todos',
      text: 'Esta seguro que desea eliminar todos los registros?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, Cancelar..',
    }).then((result) => {
      if (result.value) {
        this.clienteService.borrarTodos().subscribe(response => {
          Swal.fire('Eliminado!', 'Todos los registros fueron eliminados!', 'success');
          this.ngOnInit();
        });
      }
    });
  }


}
