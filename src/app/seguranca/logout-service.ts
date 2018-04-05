/**
 * Essa classe implementa apenas o servico de logout.
 * O logout ocorre nessa URL especifica, e deve conter um token de acesso valido
 * por isso usamos o AuthHttp.
 *
 * Com isso ficamos sem nenhum dos tokens, e é isso.
 */
import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class LogoutService {

  tokensRenokeUrl = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: AuthHttp,
    private auth: AuthService
  ) { }

  logout() {
    // de novo withCredentials, para enviar o cookie (CORS)
    // essa URL, com metodo DELETE, limpa no nosso cookie do refresh token
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        // e por fim deletamos nosso access token
        this.auth.limparAccessToken();
      });
  }

}
