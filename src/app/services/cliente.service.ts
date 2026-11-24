import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly API = 'http://localhost:3000/clientes';
  private clienteHTTP = inject(HttpClient);

  listar(): Observable<Cliente[]> {
    return this.clienteHTTP.get<Cliente[]>(this.API);
  }

  incluir(cliente: Cliente): Observable<Cliente> {
    console.log('Enviando cliente para inclusão:', cliente);
    return this.clienteHTTP.post<Cliente>(this.API, cliente);
  }

  excluir(id: string): Observable<void> {
    return this.clienteHTTP.delete<void>(`${this.API}/${id}`);
  }

  buscarPorId(id: string): Observable<Cliente> {
    return this.clienteHTTP.get<Cliente>(`${this.API}/${id}`);
  }

  editar(cliente: Cliente): Observable<Cliente> {
    return this.clienteHTTP.put<Cliente>(`${this.API}/${cliente.id}`, cliente);
  }

  login(email: string, password: string): Observable<Cliente[]> {
    const emailLimpo = email.trim().toLowerCase();
    const senhaLimpa = password.trim();

    return this.clienteHTTP.get<Cliente[]>(this.API).pipe(
      map((clientes) =>
        clientes.filter(
          (cliente) =>
            cliente.email.trim().toLowerCase() === emailLimpo &&
            cliente.senha === senhaLimpa
        )
      )
    );
  }
}