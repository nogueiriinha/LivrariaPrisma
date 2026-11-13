import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Usuario {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('Preencha o e-mail e a senha corretamente!');
      return;
    }

    const { email, password } = this.form.value;

    if (email === 'admin@admin.com' && password === 'admin123') {
      this.logarUsuario({ name: 'Administrador', email, password }, '/produtos');
      return;
    }

    if (email === 'cliente@teste.com' && password === '12345678') {
      this.logarUsuario({ name: 'Thawã', email, password }, '/perfil');
      return;
    }

    const dados = localStorage.getItem('usuarios');
    const usuarios: Usuario[] = dados ? JSON.parse(dados) : [];
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);

    if (usuarioEncontrado) {
      this.logarUsuario(usuarioEncontrado, '');
    } else {
      alert('E-mail ou senha incorretos!');
    }
  }

  private logarUsuario(usuario: Usuario, rota: string): void {
    localStorage.setItem('UsuarioLogado', JSON.stringify(usuario));
    this.router.navigate([rota]);
  }
}