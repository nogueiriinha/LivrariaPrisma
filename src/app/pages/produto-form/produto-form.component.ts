import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css'] // ou .scss
})
export class ProdutoFormComponent implements OnInit {
  produtoForm: FormGroup;
  produtoId: string | null = null;
  modoEdicao: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produtoForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.produtoId = this.route.snapshot.paramMap.get('id');
    
    if (this.produtoId) {
      this.modoEdicao = true;
      this.carregarProdutoParaEdicao(this.produtoId);
    }
  }

  carregarProdutoParaEdicao(id: string): void {
    console.log(`A carregar os dados do livro ID: ${id}...`);
    
    this.produtoForm.patchValue({
      titulo: 'Livro Carregado da Base de Dados (Mock)',
      autor: 'Autor Desconhecido',
      preco: 99.90
    });
  }

  salvar(): void {
    if (this.produtoForm.valid) {
      const dadosSalvos = this.produtoForm.value;
      
      if (this.modoEdicao) {
        console.log(`Produto atualizado ${this.produtoId}:`, dadosSalvos);
        alert('Produto atualizado com sucesso!');
      } else {
        console.log('Novo produto criado:', dadosSalvos);
        alert('Novo produto criado com sucesso!');
      }
      
      this.router.navigate(['/produtos']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/produtos']);
  }
}