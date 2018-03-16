import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

// importe tudo desse local e dê o apelido de "moment"
import * as moment from 'moment';

@Injectable()
export class PessoasService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: Http) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    // para conter nossos filtros na URL
    const params = new URLSearchParams();

    // adicionamos os parametros da paginacao
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itens.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
    // passamos os headers e os filtros
    // lembrando que "headers" eh um atalho para "headers: headers"
    // quando a chave e o nome da variavel sao iguais
    return this.http.get(`${this.pessoasUrl}`, { headers, search: params })
      .toPromise()
      .then(response => response.json());
  }

  // metodo usado para popular o combo box de pessoas
  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(id: number): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null);
  }

  inverterStatus ( id: number, status: boolean): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');
    // o segundo parametro eh o corpo da mensagem
    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, status, { headers })
      .toPromise()
      .then(() => null);
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
