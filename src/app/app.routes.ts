import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { AjudaComponent } from './pages/ajuda/ajuda.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CarrinhoCompraComponent } from './pages/carrinho-compra/carrinho-compra.component';
import { LoginComponent } from './pages/login/login.component';
import { TelaCadastroComponent } from './pages/tela-cadastro/tela-cadastro.component';
import { ProdutoListagemComponent } from './pages/produto-listagem/produto-listagem.component';
import { ProdutoFormComponent } from './pages/produto-form/produto-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'contato', component: ContatoComponent},
    { path: 'carrinho', component: CarrinhoCompraComponent},
    { path: 'ajuda', component: AjudaComponent },
    { path: 'telaCadastro', component: TelaCadastroComponent},
    { path: 'produtos', component: ProdutoListagemComponent},
    { path: 'produtos/novo', component: ProdutoFormComponent},
    { path: 'produtos/editar/:id', component: ProdutoFormComponent},
];
