import { LancamentoService } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  // propriedade que contem o filtro de descricao
  descricao: string;

  constructor(private service: LancamentoService) { }

  lancamentos = [];

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.service.pesquisar({descricao: this.descricao})
      .then(response => {
        this.lancamentos = response;
      });
  }

}
