import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

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