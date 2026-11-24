import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../model/item-carrinho';
import { Produto } from '../model/produto';
import { ProdutoService } from './produto.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  itens: ItemCarrinho[] = [];

  constructor() {
    const salvo = localStorage.getItem('carrinho');
    if(salvo){
      this.itens = JSON.parse(salvo);
    }
  }
  
  adicionar(produto: Produto): void {
    let posicao = -1;
    
    for (let i = 0; i < this.itens.length; i++) {
      if (this.itens[i].produto.id === produto.id){
        posicao = i;
      }
    }

    if (posicao === -1) {
      this.itens.push({ produto: produto, quantidade: 1});
    }else if (this.itens[posicao].quantidade < produto.estoque){
      this.itens[posicao].quantidade++;
    }

    this.salvar();
    
  }

  remover(id: string): void {

    const novaLista: ItemCarrinho[] = [];

    for(const item of this.itens){
      if (item.produto.id !== id){
        novaLista.push(item);
      }
    }

    this.itens = novaLista;
    this.salvar();
   }

   limpar(): void {
      this.itens = [];
      this.salvar();
    }

    total(): number {
      let soma = 0;
      for(const item of this.itens){
        soma += item.produto.preco * item.quantidade;
      }
      return soma;
    }

    quantidadeTotal(): number{
      let soma = 0;
      for(const item of this.itens){
        soma += item.quantidade;
      }
      return soma;
    }

   salvar(): void{
    localStorage.setItem('carrinho', JSON.stringify(this.itens));
  }

  
  
}
