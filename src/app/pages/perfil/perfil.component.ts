import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  nome = 'Thawan';
  email = 'cliente@teste.com';
  senha = '12345678';

  constructor(private router: Router) {}

  salvar() {
    alert('Perfil atualizado com sucesso!');
  }

  excluir() {
    alert('Perfil excluído com sucesso!');
    this.router.navigate(['/login']);
  }

  voltar() {
    this.router.navigate(['/']);
  }
}