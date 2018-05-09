import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  constructor(
    private relatoriosService: RelatoriosService
  ) { }

  periodoInicio: any;
  periodoFim: any;

  ngOnInit() {
  }

  gerar() {
    console.log(this.periodoInicio);
    console.log(this.periodoFim);
    // passamos as datas para nosso service, que retorna um arquivo pdf = Blob
    this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
    .then(relatorio => {
      // assim abrimos uma nova janela exibindo nosso pdf
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    });
  }

}
