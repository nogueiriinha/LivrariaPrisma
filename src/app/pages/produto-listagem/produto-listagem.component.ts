import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-listagem',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produto-listagem.component.html',
  styleUrl: './produto-listagem.component.css'
})
export class ProdutoListagemComponent implements OnInit {

  produtos: Produto[] = [];

  private service = inject(ProdutoService);
  private router = inject(Router);

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.service.listar().subscribe({
      next: (dados) => {
        this.produtos = dados;
      },
      error: () => alert('Erro ao carregar a lista de produtos.')
    });
  }

  editarProduto(id: string): void {
    this.router.navigate(['/produtos/editar', id]);
  }

  excluirProduto(id: string): void {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          // Atualiza a lista na tela após excluir no servidor
          this.carregarProdutos();
        },
        error: () => alert('Erro ao excluir o produto.')
      });
    }
  }
}