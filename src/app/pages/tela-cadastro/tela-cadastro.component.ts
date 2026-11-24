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

this.mensagem = 'Cadastro realizado com sucesso!';

localStorage.setItem('usuario', JSON.stringify({
  nome: this.nome,
  email: this.email,
  telefone: this.telefone,
  senha: this.senha
}));

setTimeout(() => {
  this.router.navigate(['/']);
}, 1000);


}

voltar() {
this.router.navigate(['/']);
}
}
