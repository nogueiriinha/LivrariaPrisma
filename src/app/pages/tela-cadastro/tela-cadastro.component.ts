import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-tela-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tela-cadastro.component.html',
  styleUrl: './tela-cadastro.component.css'
})
export class TelaCadastroComponent {

  private router = inject(Router);
  private clienteService = inject(ClienteService);

  nome = '';
  email = '';
  telefone = '';
  senha = '';
  confirmarSenha = '';

  mensagem = '';

  constructor() {}

  cadastrar() {
    if (!this.nome || !this.email || !this.telefone ||
        !this.senha || !this.confirmarSenha) {
      this.mensagem = 'Preencha todos os campos.';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mensagem = 'As senhas não coincidem.';
      return;
    }

    const novoCliente: Cliente = {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      senha: this.senha
    };

    this.clienteService.incluir(novoCliente).subscribe({
      next: (clienteSalvo) => {
        this.mensagem = 'Cadastro realizado com sucesso!';
        localStorage.setItem('usuario', JSON.stringify(clienteSalvo));

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },
      error: (erro) => {
        console.error('Erro ao cadastrar cliente:', erro);
        this.mensagem = 'Erro ao conectar com o servidor.';
      }
    });
  }

  voltar() {
    this.router.navigate(['/']);
  }
}