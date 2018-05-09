import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';

@Injectable()
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatistica/por-categoria`)
      .toPromise()
      .then(response => {
        console.log(response.json());
        return response.json();
      });
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatistica/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response.json();
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  /** Converter as datas para formato Data, pois vem em string */
  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }

}
