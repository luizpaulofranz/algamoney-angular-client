import { Component, OnInit, ViewChild } from '@angular/core';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  // propriedade que contem o filtro de descricao
  filter = new LancamentoFiltro();

  constructor(private service: LancamentoService) { }

  lancamentos = [];
  totalRegistros = 0;
  // assim que recuperamos um elemento do template
  @ViewChild('table') table;

  ngOnInit() {
    // this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filter.pagina = pagina;
    // passamos o objeto como parametro
    this.service.pesquisar(this.filter)
      .then(response => {
        // content contem a carga util
        this.lancamentos = response.content;
        this.totalRegistros = response.totalElements;
      });
  }

  // metodo chamado pelo componente grid do primeNg
  currentPage(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.service.excluir(lancamento.codigo)
      .then(() => {
        this.table.first = 0;
      });
  }

}
