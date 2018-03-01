import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // modulo que contem os componentes que sao usados apenas pelo AppComponent, como cabecalho
    CoreModule,

    LancamentosModule,
    PessoasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
