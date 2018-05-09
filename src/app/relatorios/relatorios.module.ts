import { CalendarModule } from 'primeng/calendar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from '../shared/shared.module';

import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';

@NgModule({
  imports: [
    CommonModule,
    RelatoriosRoutingModule,

    CalendarModule,
    FormsModule,

    SharedModule
  ],
  declarations: [RelatorioLancamentosComponent]
})
export class RelatoriosModule { }
