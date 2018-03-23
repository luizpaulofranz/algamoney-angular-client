import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
/*
esse modulo contem as rotas desse modulo
 */


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/novo', component: PessoaCadastroComponent },
  // passando parametros via URL, precisamos pegar isso no PessoaCadastroComponent
  { path: 'pessoas/:id', component: PessoaCadastroComponent }
];

@NgModule({
  imports: [
    // usamos o forChild quando criamos sub-rotas, ou rotas de um modulo especifico
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
