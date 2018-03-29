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

    return this.http.post(this.oauthTokenUrl, body, { headers })
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

  /* Esse metodo decodifica o JWT token e armazena no local-storage do browser */
  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    // o nome do storage deve ser token para o jwt-angular2 funcionar
    localStorage.setItem('token', token);
  }

  /* Pega o token armazenado no localStorage e decodifica */
  private recarregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

}
