/*
esse modulo contem as rotas globais da aplicacao
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';

const routes: Routes = [
  // assim configuramos o lazy-loading de modulos inteiros
  // configuramos tbm as rotas dos children em seus respectivos modulos
  { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
  { path: 'relatorios', loadChildren: 'app/relatorios/relatorios.module#RelatoriosModule' },

  // a raiz do app direciona para cá, pathMatch padrao é prefix
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  // pagina nao encontrada
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    // usamos forRoot quando tratamos rotas globais, importadas no appmodule
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
