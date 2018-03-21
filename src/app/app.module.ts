import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { AppComponent } from './app.component';

import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  // a raiz do app direciona para cá, pathMatch padrao é prefix
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  // passando parametros via URL, precisamos pegar isso no LancamentoCadastroComponent
  { path: 'lancamentos/:id', component: LancamentoCadastroComponent },
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  // pagina nao encontrada
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    // passamos as rotas para o modulo de rotas
    RouterModule.forRoot(routes),

    // modulo que contem os componentes que sao usados apenas pelo AppComponent, como cabecalho
    CoreModule,
    LancamentosModule,
    PessoasModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
