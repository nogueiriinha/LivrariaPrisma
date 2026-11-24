import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  private router = inject(Router);

  isAdmin(): boolean {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return false;
    return JSON.parse(usuario).email === 'admin@admin';
  }

  isCliente(): boolean {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return false;
    return JSON.parse(usuario).email !== 'admin@admin';
  }

  sair() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

}