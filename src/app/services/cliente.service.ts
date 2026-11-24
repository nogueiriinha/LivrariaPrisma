import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Cliente {
  id: string;
  cpf: string;
  nome: string;
  sobrenome: string;
  dtNascimento: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/clientes';

 login(email: string, password: string): Observable<Cliente[]> {
    const emailLimpo = email.trim().toLowerCase();
    const senhaLimpa = password.trim();

    return this.http.get<Cliente[]>(this.apiUrl).pipe(
      map((clientes) =>
        clientes.filter(
          (cliente) =>
            cliente.email.trim().toLowerCase() === emailLimpo &&
            cliente.password === senhaLimpa
        )
      )
    );
  }
}