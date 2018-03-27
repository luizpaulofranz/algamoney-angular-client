/* Classe responsavel por fazer as autenticacoes OAuth */
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

// import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(private http: Http) { }

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
        console.log(response);
      })
      .catch(response => {
        console.log(response);
      });
  }

}
