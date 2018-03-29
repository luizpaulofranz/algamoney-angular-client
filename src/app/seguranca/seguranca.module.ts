import { Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { JwtHelper, AuthHttp, AuthConfig } from 'angular2-jwt';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthService } from './auth.service';

/* Factory para criar o service AuthHttp, esse service depende dos Servicos nativos de Http do Angular
Esse service intercepta nossas chamadas Http e acrescenta os Headers do token (Authorization)
alem disso podemos configurar para acrescentar qualquer header que desejarmos
Assim ao usarmo o servico AuthHttp, nossas requisicoes ja terao o Authorization (ver LencamentosService e auth.servic.ts)
*/
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    // assim configuramos um Header que vai estar em todas as requisicoes
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  });
  return new AuthHttp(config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    // rotas sempre por ultimo
    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
  // nunca esqueca de colocar os services nos providers, sao eles que permitem a Injecao
  providers: [
    AuthService,
    // Service usado para manipular tokens JWT
    JwtHelper,

    // essa eh outra forma de configurar a injecao com provider
    // usamos esse tipo de provider, quando precisamos configurar nosso servico antes de Injetar
    {
      provide: AuthHttp, // a classe que sera provida
      useFactory: authHttpServiceFactory, // indicamos que essa classe sera fornecida por um Factory
      deps: [Http, RequestOptions] // e depende dessas classes
    }
  ]
})
export class SegurancaModule { }