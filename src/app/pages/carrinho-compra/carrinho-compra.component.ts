import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

interface Livro{
  id: number;
  nome:string;
  preco:number;
  quantidade:number;
}

@Component({
  selector: 'app-carrinho-compra',
  imports: [CurrencyPipe],
  templateUrl: './carrinho-compra.component.html',
  styleUrl: './carrinho-compra.component.css'
})
export class CarrinhoCompraComponent {
  livro: Livro | null = {
    id: 1,
    nome:'O Senhor dos Anéis',
    preco: 120.50,
    quantidade: 1
  };

  aumentar(){
    if (this.livro) this.livro.quantidade++;
  }

  diminuir(){
    if(this.livro && this.livro.quantidade > 1)
    this.livro.quantidade--;
  }

  get total(){
    return this.livro ? this.livro.preco * this.livro.quantidade : 0;
  }

  remover(){
    this.livro = null;
  }
}
