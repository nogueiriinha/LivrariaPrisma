import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'http://localhost:3000/clientes';
  private clienteHTTP = inject(HttpClient);

  constructor() { }

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

  
  
  login(email: string, senha: string): Observable<Cliente[]> {
    return this.clienteHTTP.get<Cliente[]>(`${this.API}?email=${email}&senha=${senha}`);
  }

}