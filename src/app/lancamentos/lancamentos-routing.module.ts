/*
esse modulo contem as rotas desse modulo
 */
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'lancamentos',
    component: LancamentosPesquisaComponent,
    // com isso adicionamos guardas a essa rota especifica
    canActivate: [AuthGuard],
    // data passa um objeto com qualquer dado para nosso Guard, aqui passamos um array de permissoes
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  {
    path: 'lancamentos/novo',
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
  {
    // assim passamos parametros, precisamos tratar no Component .ts
    path: 'lancamentos/:id',
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  }
];

@NgModule({
  imports: [
    // usamos o forChild quando criamos sub-rotas, ou rotas de um modulo especifico
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
