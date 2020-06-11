import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../cliente';
import { tap } from 'rxjs/operators';


const baseUrl = 'http://localhost:8081/api/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  listarTodos() {
    return this.http.get(baseUrl).pipe(
      tap((response: any) => {
        // tslint:disable-next-line: no-unused-expression
        response as Cliente[];
      })
    );
  }

  buscarPorId(id: number) {
    return this.http.get(`${baseUrl}/${id}`).pipe(
      tap((response: any) => {
        console.log(response);
        // tslint:disable-next-line: no-unused-expression
        response as Cliente;
      })
    );
  }

  crearCliente(cliente: Cliente) {
    return this.http.post(baseUrl, cliente);
  }

  updateCliente(id: number, cliente: Cliente) {
    return this.http.put(`${baseUrl}/${id}`, cliente);
  }

  borrarCliente(id: number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  borrarTodos() {
    return this.http.delete(baseUrl);
  }
}
