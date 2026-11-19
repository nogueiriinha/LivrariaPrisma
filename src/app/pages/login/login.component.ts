import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Cliente {
  id: number;
  cpf: string;
  nome: string;
  sobrenome: string;
  dtNascimento: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  private apiUrl = 'http://localhost:3000/clientes';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('Preencha o e-mail e a senha corretamente!');
      return;
    }

    const { email, password } = this.form.value;

    this.http.get<Cliente[]>(`${this.apiUrl}?email=${email}&password=${password}`).subscribe({
      next: (clientes) => {
        if (clientes.length > 0) {
          const clienteEncontrado = clientes[0];

          const rota = email === 'admin@email.com' ? '/produtos' : '/perfil';

          this.logarUsuario(clienteEncontrado, rota);
        } else {
          alert('E-mail ou senha incorretos!');
        }
      },
      error: () => {
        alert('Erro ao conectar com o servidor (db.json).');
      }
    });
  }

  private logarUsuario(usuario: Cliente, rota: string): void {
    localStorage.setItem('UsuarioLogado', JSON.stringify(usuario));
    this.router.navigate([rota]);
  }
}