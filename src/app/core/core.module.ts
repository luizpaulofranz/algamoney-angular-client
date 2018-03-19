import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

// Locale Imports
// Adicione o registerLocaleData e o localePt
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { CategoriaService } from '../categoria/categoria.service';

// E por fim, registre o localePt como 'pt-BR'
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    CommonModule,
    // só usamos o forRoot quando estamos no modulo raiz
    ToastyModule.forRoot(),
    // esse modulo de janelas de confirmação do primeNg
    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent
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
    // Provider Por Valor
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
