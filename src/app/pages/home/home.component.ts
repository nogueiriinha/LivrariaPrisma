import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho.service';


@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
 @ViewChild('carrossel', { static: false }) carrossel!: ElementRef;
  
  livros: any[] = []; 
 
 

  constructor(private ProdutoService: ProdutoService, private router: Router, private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros() {
    this.ProdutoService.getLivros().subscribe({
      next: (dados) => {
        this.livros = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar livros da API:', erro);
      }
    });
  }

  comprarLivro(livro: any) {
    console.log('Clicou em comprar:', livro);
    this.carrinhoService.adicionar(livro);
    this.router.navigate(['/carrinho']);
  }

  rolarCarrossel(direcao: number) {
    const elemento = this.carrossel.nativeElement;
    const larguraItem = 265; 
    
    elemento.scrollBy({
      left: direcao * larguraItem,
      behavior: 'smooth'
    });
  }
}