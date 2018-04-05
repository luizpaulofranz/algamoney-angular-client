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
import { MoneyHttp } from './money-http';
import { AuthGuard } from './auth.guard';

/* Factory para criar o service MoneyHttp que extende AuthHttp. AuthHttp depende dos Servicos nativos
de Http do Angular e intercepta nossas chamadas Http e acrescenta os Headers do token (Authorization)
alem disso podemos configurar para acrescentar qualquer header que desejarmos
Ao usar AuthHttp, nossas requisicoes ja terao o Authorization (ver LencamentosService e auth.servic.ts)

Jah MoneyHttp acrescenta mais uma funcionalidade a esse service, verificando, antes de cada
request se o access token eh valido, caso nao, ele gera um novo access token usando refreshtoken
Isso fica trasparente na aplicacao, pois continuamos usando a interface de AuthService
*/
export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    // assim configuramos um Header que vai estar em todas as requisicoes
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  });
  return new MoneyHttp(auth, config, http, options);
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
      deps: [AuthService, Http, RequestOptions] // e depende dessas classes
    },
    // esse service verifica se o usuario logado tem permissao para acessar determinada rota
    AuthGuard
  ]
})
export class SegurancaModule { }
