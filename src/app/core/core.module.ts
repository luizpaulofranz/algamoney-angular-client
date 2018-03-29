import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Locale Imports
// Adicione o registerLocaleData e o localePt
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { CategoriaService } from '../categoria/categoria.service';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

// E por fim, registre o localePt como 'pt-BR'
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    CommonModule,
    // para usar routerLink no frontend
    RouterModule,
    // só usamos o forRoot quando estamos no modulo raiz
    ToastyModule.forRoot(),
    // esse modulo de janelas de confirmação do primeNg
    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent, PaginaNaoEncontradaComponent
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    // esse service eh para manipular os Confir Dialogs
    ConfirmationService,
    CategoriaService,
    // Servico para alterar o titulo das nossas paginas
    Title,
    // Provider Por Valor
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
