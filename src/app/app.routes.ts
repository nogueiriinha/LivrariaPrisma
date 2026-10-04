import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { AjudaComponent } from './pages/ajuda/ajuda.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent},
    { path: 'sobre', component: SobreComponent },
    { path: 'contato', component: ContatoComponent},
    { path: 'ajuda', component: AjudaComponent },

];
