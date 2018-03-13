import { Component } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private toastyConfig: ToastyConfig) {
    // configuramos o tema padrão do Toasty
    // https://github.com/akserg/ng2-toasty
    // Toasty é um componente para exibição de mensagens ao usuario
    this.toastyConfig.theme = 'bootstrap';
  }
}
