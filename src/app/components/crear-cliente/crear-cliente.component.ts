import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../cliente';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
})
export class CrearClienteComponent implements OnInit {
  cliente: Cliente;
  submited: boolean;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit() {
    this.cliente = new Cliente();
    this.submited = false;
  }

  crearCliente() {
    Swal.fire({
      title: 'Crear Cliente',
      text: 'Esta seguro que desea registrar al Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, crear!',
      cancelButtonText: 'No, Cancelar..',
    }).then((result) => {
      if (result.value) {
        if (
          Object.entries(this.cliente).length === 3
        ) {
          this.clienteService.crearCliente(this.cliente).subscribe(
            (response) => {
              Swal.fire(
                'Registrado!',
                'El Cliente ha sido registrado exitosamente',
                'success'
              );
              this.router.navigateByUrl('/clientes');
            },
            (error) => {
              Swal.fire(
                'Error!',
                'No fue posible registrar el Cliente',
                'error'
              );
            }
          );
        } else {
          Swal.fire('Error!', 'Debe completar todos los campos', 'error');
        }
      }
    });
  }
}
