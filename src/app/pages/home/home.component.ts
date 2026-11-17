import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
 @ViewChild('carrossel', { static: false }) carrossel!: ElementRef;
  
  livros: any[] = []; // Array que vai receber os livros da API

  constructor(private ProdutoService: ProdutoService) {}

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

  rolarCarrossel(direcao: number) {
    const elemento = this.carrossel.nativeElement;
    const larguraItem = 265; // Tamanho do card + espaçamento (gap)
    
    elemento.scrollBy({
      left: direcao * larguraItem,
      behavior: 'smooth'
    });
  }
}