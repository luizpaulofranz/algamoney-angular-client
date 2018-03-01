/**
 * Esse módulo contém todos os componentes que serão compartilhados por vários
 * outros módulos ou componentes, bastando assim importar apenas um módulo
 * nos nossos códigos.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MessageComponent
  ],
  exports: [
    MessageComponent
  ]
})
export class SharedModule { }
