import { Injectable } from '@angular/core';
import { ResponseContentType, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
// tratar os parametros de data
import * as moment from 'moment';

import { environment } from './../../environments/environment';

@Injectable()
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    // pegamos a URL das conf de ambiente
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  /** Esse metodo retorna um arquivo .pdf, por isso tratamos seu retorno como Blob
   * Na verdade qualquer arquivo binario deve ser blob = Binary Large Object
   */
  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params = new URLSearchParams();
    // tratamos os parametros de data para o formato do backend
    params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
    params.set('fim', moment(fim).format('YYYY-MM-DD'));

    // aqui passamos o ResponseType, indicando que se trata de um Blob
    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
      { search: params, responseType: ResponseContentType.Blob })
      .toPromise()
      // de novo, blob aqui
      .then(response => response.blob());
  }

}
