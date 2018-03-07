import { Component, OnInit } from '@angular/core';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  // propriedade que contem o filtro de descricao
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;

  constructor(private service: LancamentoService) { }

  lancamentos = [];

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {

    // criamos um objeto do tipo filtro (uma interface)
    const filter: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    };

    // passamos o objeto como parametro
    this.service.pesquisar(filter)
      .then(response => {
        this.lancamentos = response;
      });
  }

}
