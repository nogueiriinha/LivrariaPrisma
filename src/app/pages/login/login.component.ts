import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  private clienteService = inject(ClienteService);

  email = '';
  password = '';
  mensagem = '';

  entrar(): void {
    const email = this.email.trim().toLowerCase();
    const password = this.password.trim();

    if (!email || !password) {
      this.mensagem = 'Preencha o e-mail e a senha.';
      return;
    }

    if (email === 'admin@admin' && password === 'admin') {
      localStorage.setItem(
        'usuario',
        JSON.stringify({ nome: 'Administrador', email })
      );
      this.router.navigate(['/produtos']);
      return;
    }

    this.clienteService.login(email, password).subscribe({
      next: (clientes) => {
        if (!clientes.length) {
          this.mensagem = 'E-mail ou senha inválidos.';
          return;
        }

        const { senha: _, ...clienteSessao } = clientes[0];
        localStorage.setItem('usuario', JSON.stringify(clienteSessao));
        this.router.navigate(['/']);
      },
      error: () => {
        this.mensagem = 'Erro ao conectar com a API.';
      }
    });
  }
}