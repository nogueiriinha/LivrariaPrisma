import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

interface Livro{
  id: number;
  nome:string;
  preco:number;
  quantidade:number;
  imagem: string
}

@Component({
  selector: 'app-carrinho-compra',
  imports: [CurrencyPipe],
  templateUrl: './carrinho-compra.component.html',
  styleUrl: './carrinho-compra.component.css'
})
export class CarrinhoCompraComponent {
  livros: Livro[] = [
    {id: 1, nome:'O Senhor dos Anéis', preco: 120.50, quantidade: 1, imagem: 'img/senhor-dos-aneis.jpg'},
    {id:2, nome:'1984', preco:45.90, quantidade: 1, imagem:'img/1984.jpg'},
    {id:3, nome:'Dom Casmurro', preco: 35.00, quantidade: 1, imagem:'img/dom-casmurro.jpg'},
  ];

  aumentar(livro: Livro){
    livro.quantidade++;
  }

  diminuir(livro:Livro){
    if(livro.quantidade > 1)
    livro.quantidade--;
  }

  get total(){
    return this.livros.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  }

  remover(livro:Livro){
    this.livros = this.livros.filter((item) => item !== livro);
  }
}
