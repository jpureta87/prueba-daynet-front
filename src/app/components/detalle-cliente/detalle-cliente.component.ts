import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../cliente';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css'],
})
export class DetalleClienteComponent implements OnInit {
  clienteActual: Cliente;
  clienteId: string;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.clienteId = this.route.snapshot.paramMap.get('id');
    this.buscarCliente(+this.clienteId);
  }

  buscarCliente(id: number) {
    this.clienteService.buscarPorId(id).subscribe((response) => {
      this.clienteActual = response;
    });
  }

  actualizarCliente() {
    Swal.fire({
      title: 'Actualizar Cliente',
      text: 'Esta seguro que desea actualizar el registo del Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar!',
      cancelButtonText: 'No, Cancelar..',
    }).then((result) => {
      if (result.value) {

        if (this.clienteActual.nombre !== '' && this.clienteActual.apellido !== '' && this.clienteActual.cuenta !== '' ) {
          this.clienteService
          .updateCliente(this.clienteActual.id, this.clienteActual)
          .subscribe(
            (response) => {
              Swal.fire(
                'Actualizado!',
                'El Cliente ha sido actualizado exitosamente',
                'success'
              );
              this.router.navigateByUrl('/clientes');
            },
            (error) => {
              Swal.fire(
                'Error!',
                'No fue posible actualizar el Cliente',
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

  elimiarCliente() {
    Swal.fire({
      title: 'Eliminar Cliente',
      text: 'Esta seguro que desea eliminar el Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, Cancelar..',
    }).then((result) => {
      if (result.value) {
        this.clienteService.borrarCliente(this.clienteActual.id).subscribe(
          (response) => {
            Swal.fire('Eliminado!', 'El Cliente ha sido eliminado exitosamente', 'success');
            this.router.navigateByUrl('/clientes');
          },
          (error) => {
            Swal.fire('Error!', 'No fue posible eliminar el Cliente', 'error');
          }
        );
      }
    });
  }
}
