import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    // para conter nossos filtros na URL
    const params = new URLSearchParams();

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    // passamos os headers e os filtros
    // lembrando que "headers" eh um atalho para "headers: headers"
    // quando a chave e o nome da variavel sao iguais
    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, search: params })
      .toPromise()
      .then(response => response.json().content);
  }

}

/**
 * Interface para definir os campos do filtro
 */
export interface LancamentoFiltro {
  descricao: string;
}
