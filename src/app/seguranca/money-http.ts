/* Essa classe eh um wrapper do AuthHttp, assim extendemos todos os recursos de AuthHttp
para verificar se o access token ainda esta valido.
Essa classe eh passada aos Components por meio de Injecao de Dependencia, configurado
no providers do SegurancaModule
 */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { ExpiredRefreshTokenError } from './../core/error-handler.service';

@Injectable()
export class MoneyHttp extends AuthHttp {

  constructor(
    // nosso service auth.service.ts, para verificar o token, criar novo token, fazer login, etc
    private auth: AuthService,
    // os demais parametros sao do AuthHttp, que veio do angular2-jwt (ver SegurancaModule)
    options: AuthConfig,
    http: Http, defOpts?: RequestOptions
  ) {
    super(options, http, defOpts);
  }

  /* A unica coisa que fazemos, eh verificar se o access token ja expirou,
  e encaminhamos para o metodo pai */
  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.delete(url, options));
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.patch(url, options));
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.head(url, options));
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.options(url, options));
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.get(url, options));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.post(url, body, options));
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.put(url, body, options));
  }

  /** Aqui verificamos se o access token esta valido, caso nao criamos um novo access
   * token a partir do refresh token. fn() eh callback */
  private fazerRequisicao(fn: Function): Observable<Response> {
    // se o access token atual esta invalido (ja expirou ou nao existe)
    if (this.auth.isAccessTokenInvalid()) {
      console.log('Requisição HTTP com access token inválido. Obtendo novo token...');
      // criamos um novo access token
      const chamadaNovoAccessToken = this.auth.getNewAccessToken()
        .then(() => {
          // se ainda estiver invalido, quer dizer que o refrestoken expirou
          if (this.auth.isAccessTokenInvalid()) {
            // lancammos uma excecao que nos criamos
            throw new ExpiredRefreshTokenError();
          }
          return fn().toPromise();
        });

      return Observable.fromPromise(chamadaNovoAccessToken);
    } else {
      return fn();
    }
  }

}
