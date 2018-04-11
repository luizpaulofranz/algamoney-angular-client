import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';
/*
esse modulo contem as rotas desse modulo
 */


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    // "pessoas" foi adicionado no app-routing.module, por isso vazio
    path: '',
    component: PessoasPesquisaComponent,
    // com isso adicionamos Guards a essa rota
    canActivate: [AuthGuard],
    // passa um objeto que pode conter qualquer dado, para ser usado nos tratamentos do Guard
    // aqui passamos a permissao, e o guard analisa se o usuario tem a permissao que a rota exige
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  },
  {
    // isso se torna pessoa/nova
    path: 'nova',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
  {
    // passando parametros via URL, precisamos pegar isso no PessoaCadastroComponent
    path: ':id',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  }
];

@NgModule({
  imports: [
    // usamos o forChild quando criamos sub-rotas, ou rotas de um modulo especifico
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
