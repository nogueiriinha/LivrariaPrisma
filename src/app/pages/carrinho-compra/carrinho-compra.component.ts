import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItemCarrinho } from '../../model/item-carrinho';
import { ProdutoService } from '../../services/produto.service';

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
  standalone: true,
  templateUrl: './carrinho-compra.component.html',
  styleUrl: './carrinho-compra.component.css'
})
export class CarrinhoCompraComponent {
  constructor(
    public carrinho: CarrinhoService,
    private produtoService: ProdutoService
  ){}

  aumentar(item: ItemCarrinho){
    if(item.quantidade < item.produto.estoque){
      item.quantidade++;
      this.carrinho.salvar();
    }
  }

  diminuir(item: ItemCarrinho){
    if(item.quantidade > 1){
      item.quantidade--;
      this.carrinho.salvar();
    }
  }

  remover(item: ItemCarrinho){
    this.carrinho.remover(item.produto.id);
  }

  get total(){
    return this.carrinho.total();
  }

  finalizarCompra(){
    for(const item of this.carrinho.itens){
      const produto = item.produto;
      produto.estoque = produto.estoque - item.quantidade;
      this.produtoService.editar(produto).subscribe();
    }

    this.carrinho.limpar();
    alert('Compra finalizada')
  }
}
