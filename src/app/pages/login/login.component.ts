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
    if (!this.email || !this.password) {
      this.mensagem = 'Preencha o e-mail e a senha.';
      return;
    }

    this.clienteService.login(this.email, this.password).subscribe({
      next: (clientes) => {
        if (clientes.length > 0) {
          const { password, ...clienteSessao } = clientes[0];
          localStorage.setItem('usuario', JSON.stringify(clienteSessao));
          this.router.navigate(['/']);
        } else {
          this.mensagem = 'E-mail ou senha inválidos.';
        }
      },
      error: () => {
        this.mensagem = 'Erro ao conectar com a API.';
      }
    });
  }
}
