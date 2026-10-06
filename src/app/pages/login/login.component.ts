import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {

  name: string;
  email: string;
  password: string
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {

    this.form = this.fb.group({
      name: '',
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.form.reset();
  }

  getUsuarios(): Usuario[] {
    const dados = localStorage.getItem('usuarios');
    return dados ? JSON.parse(dados) : [];


  }

  salvaUsuarios(Lista: Usuario[]): void {
    localStorage.setItem('usuarios', JSON.stringify(Lista))
  }

  onSubmit(): void {
    const { email, password } = this.form.value;

    if (!email || !password) {
      alert('Preenche o email e a senha, mano!');
      return;
    }

    if (email === 'admin@admin.com' && password === 'admin123') {
      const adminUser = { name: 'Administrador', email: email, password: password };
      localStorage.setItem('UsuarioLogado', JSON.stringify(adminUser));
      this.router.navigate(['home']);
      return;
    }

    if (this.isLoginMode) {
      const usuarios = this.getUsuarios();
      const usuario = usuarios.find(u => u.email === email && u.password === password);

      if (usuario) {
        localStorage.setItem('UsuarioLogado', JSON.stringify(usuario));
        this.router.navigate(['home']);
      } else {
        alert('Email ou senha incorretos!');
      }
    } else {

      alert('O cadastro de novos utilizadores é gerido por outro módulo. Utiliza o login normal!');
      this.toggleMode();
    }
  }
}
