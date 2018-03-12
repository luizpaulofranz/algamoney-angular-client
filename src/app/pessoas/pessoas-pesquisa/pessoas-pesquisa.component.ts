import { Component } from '@angular/core';
import { PessoasService, PessoaFiltro } from './../pessoas.service';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})

export class PessoasPesquisaComponent {

  // propriedade que contem o filtro de descricao
  filter = new PessoaFiltro();

  constructor(private service: PessoasService) { }

  pessoas = [];
  totalRegistros = 0;

  pesquisar(pagina = 0) {
    this.filter.pagina = pagina;
    // passamos o objeto como parametro
    this.service.pesquisar(this.filter)
      .then(response => {
        // content contem a carga util
        this.pessoas = response.content;
        this.totalRegistros = response.totalElements;
      });
  }

  // metodo chamado pelo componente grid do primeNg
  currentPage(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
