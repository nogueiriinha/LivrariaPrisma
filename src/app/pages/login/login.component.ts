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
    console.log('Form submit enviado')

    const { email, password } = this.form.value;
    console.log('Email digitado:', email);
    console.log('Senha digitada:', password);

    if (!email || !password) {
      alert('Preencher o email e a senha');
      return;
    }

    if (this.isLoginMode) {
      if (email === 'admin@admin.com' && password === 'admin123') {
        const adminUser = { name: 'Administrador', email: email, password: password };
        localStorage.setItem('UsuarioLogado', JSON.stringify(adminUser));
        console.log('Login de Administrador efetuado com sucesso!');
        this.router.navigate(['home']);
        return;
      }

      const usuarios = this.getUsuarios();
      const usuario = usuarios.find(u => u.email === email && u.password === password);

      if (usuario) {
        localStorage.setItem('UsuarioLogado', JSON.stringify(usuario));
        this.router.navigate(['home']);
      } else {
        alert('Email ou senha incorretos!');
      }
    } else {
      const usuarios = this.getUsuarios();
      const usuarioJaExiste = usuarios.some(u => u.email === email);
      if (usuarioJaExiste) {
        alert('Este email ja existe');
        return;
      }

      const nomeGerado = email.split('@')[0];
      const novoUsuario: Usuario = { name: nomeGerado, email, password };
      usuarios.push(novoUsuario);
      this.salvaUsuarios(usuarios);
      alert('Conta criada com sucesso!');
      this.toggleMode();
      this.form.reset();

    }
  }


}
