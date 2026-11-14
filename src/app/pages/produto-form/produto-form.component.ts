import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../services/produto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css'
})
export class ProdutoFormComponent implements OnInit {

  produto: Produto = {} as Produto;
  
  private service = inject(ProdutoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  produtoId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    if (this.produtoId) {
      this.service.buscarPorId(this.produtoId).subscribe({
        next: (produto) => {
          this.produto = produto;
        },
        error: () => alert('Produto não encontrado.')
      });
    }
  }

  salvar(): void {
    if (this.produtoId) {
      // Alteração
      this.service.editar(this.produto).subscribe({
        next: (produto) => {
          this.produto = produto;
          alert(`Livro "${this.produto.titulo}" atualizado com sucesso!`);
          this.router.navigate(['/produtos']);
        }
      });
    } else {
      // Inclusão
      this.service.incluir(this.produto).subscribe({
        next: (produto) => {
          this.produto = produto;
          alert(`Livro "${this.produto.titulo}" cadastrado com sucesso!`);
          this.router.navigate(['/produtos']);
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/produtos']);
  }
}