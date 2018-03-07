import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

// importe tudo desse local e de o apelido de "moment"
import * as moment from 'moment';

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    // para conter nossos filtros na URL
    const params = new URLSearchParams();

    if (filtro.dataVencimentoInicio) {
      // usamos a biblioteca moment para converter Date para string
      params.set('initDate', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoFim) {
      params.set('finishDate', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }
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
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}
