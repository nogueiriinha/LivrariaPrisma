import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

    private readonly API = 'http://localhost:3000/produtos';
    private produtoHTTP = inject(HttpClient);

  constructor() { }
  
  listar(): Observable<Produto[]> {
    return this.produtoHTTP.get<Produto[]>(this.API);
  }
  
  incluir(produto: Produto): Observable<Produto> {
    console.log('Enviando produto para inclusão:', produto);
    return this.produtoHTTP.post<Produto>(this.API, produto);
  }

  excluir(id: string): Observable<void> {
    return this.produtoHTTP.delete<void>(`${this.API}/${id}`);
  }

  buscarPorId(id: string): Observable<Produto> {
    return this.produtoHTTP.get<Produto>(`${this.API}/${id}`);
  }
  
  editar(produto: Produto): Observable<Produto> {
    return this.produtoHTTP.put<Produto>(`${this.API}/${produto.id}`, produto);
  }
  
}  