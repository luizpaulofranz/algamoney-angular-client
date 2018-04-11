import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    // modulo que contem os componentes que sao usados apenas pelo AppComponent, como cabecalho
    CoreModule,
    // devemos importar aqui todos os nossos modulos de componentes
    SegurancaModule,
    // modulo que contem as rotas globais, deve ser o ultimo import
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
