/* Classe responsavel por fazer as autenticacoes OAuth */
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

// import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  // aqui esta as informacoes passadas pelo JWT
  jwtPayload: any;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
  ) {
    // caso o token de acesso ja exista, deixa o JWT ja carregado e decodificado
    this.recarregarToken();
  }

  /* Verifica se o TOKEN atual (usuario logado) tem a permissao passada por parametro
  dentro do payload do JWT, a posicao authorities tem um array de strings
  que sao as permissoes, no formato ROLE_PESQUISAR_LANCAMENTO */
  hasPermission(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  hasAnyPermission(permissoes: string[]) {
    for (const role of permissoes) {
      if (this.hasPermission(role)) {
        return true;
      }
    }
    return false;
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();
    // esse content type eh para usarmos o body daquela forma
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // veja na API, aqui estamos passando as credenciais do aplicativo
    // o login e senha do cliente sao passados no bagulho abaixo
    // isso aqui eh usuario:senha em base64, ou seja: angular:@ngul@r0
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    // esses sao os dados exigidos pelo Oauth
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    // withCredentials: true eh para carregar o cookie no cross-origin
    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        // login correto, retorna um json e na posicao access_token ...
        this.armazenarToken(response.json().access_token);
      })
      .catch(response => {
        // login errado
        if (response.status === 400) {
          const responseJson = response.json();
          if (responseJson.error === 'invalid_grant') {
            // isso vai acabar sendo tratado lah no ErrorHandler, com esse erro
            return Promise.reject('Usuário ou senha inválidos!');
          }
        }
        // aqui simplesmente passamos o response para o ErrorHandler
        return Promise.reject(response);
      });
  }

  /* Verifica se o token ja expirou  */
  isAccessTokenInvalid() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  /* Pega um novo access token usando o Refresh Token
  o refresh token esta nos cookies*/
  getNewAccessToken() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    // infomamos a API que deve gerar um novo access token
    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
        { headers, withCredentials: true }) // withCredentials eh para tratar cross site
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);

        console.log('Novo access token criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  /* Esse metodo decodifica o JWT token e armazena no local-storage do browser */
  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    // o nome do storage deve ser token para o jwt-angular2 funcionar
    localStorage.setItem('token', token);
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  /* Pega o token armazenado no localStorage e decodifica */
  private recarregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

}
