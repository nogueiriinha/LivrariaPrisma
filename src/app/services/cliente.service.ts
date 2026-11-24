import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.get<Cliente[]>(this.apiUrl, { params });
  }
}
