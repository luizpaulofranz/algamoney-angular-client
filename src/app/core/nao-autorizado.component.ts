import { Component, OnInit } from '@angular/core';

/** Pagina renderizada quando usuario tenta acessar um recurso ao qual nao tem acesso */
@Component({
  template: `
  <div class="container">
    <h1 class="text-center">Acesso negado!</h1>
  </div>
  `,
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
