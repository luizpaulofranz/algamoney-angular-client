/*
esse modulo contem as rotas desse modulo
 */
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  // passando parametros via URL, precisamos pegar isso no LancamentoCadastroComponent
  { path: 'lancamentos/:id', component: LancamentoCadastroComponent }
];

@NgModule({
  imports: [
    // usamos o forChild quando criamos sub-rotas, ou rotas de um modulo especifico
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
