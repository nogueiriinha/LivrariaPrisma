import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tela-cadastro.component.html',
  styleUrl: './tela-cadastro.component.css'
})
export class TelaCadastroComponent {

  nome = '';
  email = '';
  telefone = '';
  senha = '';
  confirmarSenha = '';
  
  mensagem = '';

  mostrarSenha = false;
  mostrarConfirmarSenha = false;

  constructor(private router: Router) {}

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

    if (this.senha.length < 6) {
      this.mensagem = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    const usuario = {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      senha: this.senha
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.mensagem = 'Cadastro realizado com sucesso!';

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }

  

  voltar() {
    this.router.navigate(['/']);
  }
}