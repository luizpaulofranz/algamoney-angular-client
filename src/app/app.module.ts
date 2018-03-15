import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';

// Locale Imports
// Adicione o registerLocaleData e o localePt
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import {ToastyModule} from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { AppComponent } from './app.component';


// E por fim, registre o localePt como 'pt-BR'
registerLocaleData(localePt, 'pt-BR');

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
    // só usamos o forRoot quando estamos no modulo raiz
    ToastyModule.forRoot(),
    // esse modulo de janelas de confirmação do primeNg
    ConfirmDialogModule,

    LancamentosModule,
    PessoasModule
  ],
  providers: [
    // esse service eh para manipular os Confir Dialogs
    ConfirmationService,
    // Provider Por Valor
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
