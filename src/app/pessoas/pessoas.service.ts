import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

// importe tudo desse local e dê o apelido de "moment"
import * as moment from 'moment';
import { Pessoa } from '../core/model';
import { environment } from './../../environments/environment';

@Injectable()
export class PessoasService {
  pessoasUrl = `${environment.apiUrl}/pessoas`;

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    // para conter nossos filtros na URL
    const params = new URLSearchParams();

    // adicionamos os parametros da paginacao
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itens.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
    // passamos os filtros
    // lembrando que o Header Authentication eh inserido globalmente
    // pelo servico AuthHttp, configurado e provido no SegurancaModule
    return this.http.get(`${this.pessoasUrl}`, { search: params })
      .toPromise()
      .then(response => response.json());
  }

  // metodo usado para popular o combo box de pessoas
  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(id: number): Promise<any> {
    return this.http.delete(`${this.pessoasUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  inverterStatus ( id: number, status: boolean): Promise<any> {
    // o segundo parametro eh o corpo da mensagem
    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, status)
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  getById(id: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${id}`)
      .toPromise()
      .then(response => {
        // convertemos o json em uma classe
        const retorno = response.json() as Pessoa;
        return retorno;
      });
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    pessoa.ativo = true;
    return this.http.put(`${this.pessoasUrl}/${pessoa.id}`,
        // o body eh string
        JSON.stringify(pessoa))
      .toPromise()
      .then(response => {
        const retorno = response.json() as Pessoa;
        return retorno;
      });
  }

}

/**
 * Interface para definir os campos do filtro
 */
export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itens = 5;
}
