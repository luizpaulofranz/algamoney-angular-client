import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

// importe tudo desse local e dê o apelido de "moment"
import * as moment from 'moment';
import { Lancamento } from '../core/model';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
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
    // passamos os filtros
    // lembrando que o Header Authorization eh inserido pelo AuthHttp
    return this.http.get(`${this.lancamentosUrl}?resumo`, { search: params })
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(this.lancamentosUrl,
        // o body eh string
        JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  getById(id: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentosUrl}/${id}`)
      .toPromise()
      .then(response => {
        // convertemos o json em uma classe
        const retorno = response.json() as Lancamento;
        // convertemos a data para objeto
        this.stringToDate([retorno]);
        return retorno;
      });
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.lancamentosUrl}/${lancamento.id}`,
        // o body eh string
        JSON.stringify(lancamento))
      .toPromise()
      .then((response) => {
        const retorno = response.json() as Lancamento;
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
