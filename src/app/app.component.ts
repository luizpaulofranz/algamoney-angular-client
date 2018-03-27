import { Component } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private toastyConfig: ToastyConfig,
    // injetamos o router pre verificar a URL atual (tela de login)
    private router: Router
  ) {
    // configuramos o tema padrão do Toasty
    // https://github.com/akserg/ng2-toasty
    // Toasty é um componente para exibição de mensagens ao usuario
    this.toastyConfig.theme = 'bootstrap';
  }

  /* Metodo usado para esconder o menu na tela de login */
  exibindoNavbar() {
    return this.router.url !== '/login';
  }
}
