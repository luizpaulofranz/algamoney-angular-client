import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

// importe tudo desse local e dê o apelido de "moment"
import * as moment from 'moment';
import { Lancamento } from '../core/model';

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    // para conter nossos filtros na URL
    const params = new URLSearchParams();

    // adicionamos os parametros da paginacao
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itens.toString());

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
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.lancamentosUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.lancamentosUrl,
        // o body eh string
        JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => response.json());
  }

  getById(id: number): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.get(`${this.lancamentosUrl}/${id}`, { headers })
      .toPromise()
      .then(response => {
        // convertemos o json em uma classe
        const retorno = response.json() as Lancamento;
        console.log(retorno);
        // convertemos a data para objeto
        this.stringToDate([retorno]);
        return retorno;
      });
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');
    console.log('entrou');
    console.log(lancamento);
    return this.http.put(`${this.lancamentosUrl}/${lancamento.id}`,
        // o body eh string
        JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => {
        const retorno = response.json() as Lancamento;
        console.log('retorno');
        console.log(retorno);
        // convertemos a data
        this.stringToDate([retorno]);
        return retorno;
      });
  }

  // usamos a lib moment.js para converter datas em String para objetos Date
  stringToDate(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}

/**
 * Interface para definir os campos do filtro
 */
export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itens = 5;
}
