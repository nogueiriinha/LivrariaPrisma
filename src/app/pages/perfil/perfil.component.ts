import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../model/cliente';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  private router = inject(Router);
  private clienteService = inject(ClienteService);

  cliente: Cliente = {
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    senha: ''
  };

  editando = false;
  mensagem = '';

  constructor() {
    const dados = localStorage.getItem('usuario');

    if (!dados) {
      this.router.navigate(['/login']);
      return;
    }

    const usuario = JSON.parse(dados);

    if (usuario.email === 'admin@admin') {
      this.router.navigate(['/produtos']);
      return;
    }

    this.cliente = usuario;

    if (usuario.id) {
      this.clienteService.buscarPorId(usuario.id).subscribe({
        next: (clienteBanco) => {
          this.cliente = clienteBanco;
        }
      });
    }
  }

  ativarEdicao() {
    this.editando = true;
    this.mensagem = '';
  }

  cancelar() {
    const dados = localStorage.getItem('usuario');
    if (dados) {
      const usuario = JSON.parse(dados);
      this.cliente = usuario;

      if (usuario.id) {
        this.clienteService.buscarPorId(usuario.id).subscribe({
          next: (clienteBanco) => {
            this.cliente = clienteBanco;
          }
        });
      }
    }
    this.editando = false;
    this.mensagem = '';
  }

  salvar() {
    if (!this.cliente.nome || !this.cliente.sobrenome || !this.cliente.email ||
        !this.cliente.telefone || !this.cliente.cpf || !this.cliente.dataNascimento ||
        !this.cliente.senha) {
      this.mensagem = 'Preencha todos os campos.';
      return;
    }

    this.clienteService.editar(this.cliente).subscribe({
      next: (clienteAtualizado) => {
        const { senha: _, ...clienteSemSenha } = clienteAtualizado;
        localStorage.setItem('usuario', JSON.stringify(clienteSemSenha));
        this.cliente = clienteAtualizado;
        this.editando = false;
        this.mensagem = 'Dados atualizados com sucesso!';
      },
      error: () => {
        this.mensagem = 'Erro ao atualizar os dados.';
      }
    });
  }

  excluirConta() {
    if (!this.cliente.id) {
      return;
    }

    if (confirm('Deseja realmente excluir sua conta?')) {
      this.clienteService.excluir(this.cliente.id).subscribe({
        next: () => {
          localStorage.removeItem('usuario');
          this.router.navigate(['/']);
        },
        error: () => {
          this.mensagem = 'Erro ao excluir a conta.';
        }
      });
    }
  }

  sair() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}