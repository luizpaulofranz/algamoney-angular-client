/*
esse modulo contem as rotas globais da aplicacao
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';

const routes: Routes = [
  // a raiz do app direciona para cá, pathMatch padrao é prefix
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'pessoas', component: PessoasPesquisaComponent },
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
