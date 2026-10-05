import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface Produto {
  id: number;
  titulo: string;
  autor: string;
  preco: number;
}

@Component({
  selector: 'app-produto-listagem',
  imports: [CommonModule, RouterModule],
  templateUrl: './produto-listagem.component.html',
  styleUrl: './produto-listagem.component.css'
})
export class ProdutoListagemComponent {
  produtos: Produto[] = [
    { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', preco: 120.50 },
    { id: 2, titulo: '1984', autor: 'George Orwell', preco: 45.90 },
    { id: 3, titulo: 'Dom Casmurro', autor: 'Machado de Assis', preco: 35.00 }
  ];

  constructor(private router: Router) {}

  editarProduto(id: number): void {
    // Redireciona para a rota de edição passando o ID do produto
    this.router.navigate(['/produtos/editar', id]);
  }

  excluirProduto(id: number): void {
    // Apenas protótipo visual, não apaga os dados
    alert(`[Protótipo] O produto com ID ${id} seria excluído do banco de dados.`);
  }
}
