import { Component, ViewChild } from '@angular/core';

import { PessoasService, PessoaFiltro } from './../pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})

export class PessoasPesquisaComponent {

  // propriedade que contem o filtro de descricao
  filter = new PessoaFiltro();
  // assim que recuperamos um elemento do template
  @ViewChild('table') table;

  constructor(
    private service: PessoasService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
  ) { }

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
      console.log(this.pessoas);
  }

  // metodo chamado pelo componente grid do primeNg
  currentPage(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  /** Esse eh o metodo que deve ser cahmado no template */
  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      // callback, qual funcao sera chamada
      accept: () => this.excluir(pessoa)
    });
  }

  excluir(pessoa: any) {
    this.service.excluir(pessoa.id)
      .then(() => {
        // isso eh para atualizar o grid de pessoas
        if (this.table.first === 0) {
          this.pesquisar();
        } else {
          this.table.first = 0;
        }
        // assim adicionamos uma mensagem ao usuario
        this.toasty.success('Registro Excluído com Sucesso!');
      })
      .catch(error => this.errorHandler.handle(error));
  }

  // inverte o status de uma pessoa, usado para ativar ou desativar a pessoa
  inverterStatus (pessoa: any) {
    const novoStatus = !pessoa.ativo;

    this.service.inverterStatus(pessoa.id, novoStatus)
      .then(() => {
        const partial = novoStatus ? 'ativada' : 'desativada';
        this.toasty.success(`Pessoa ${partial} com Sucesso!`);
        // atualizamos o registro com o novo status, para alterar no grid
        this.pessoas.find( (listPessoa) => {
            return listPessoa.id === pessoa.id;
        }).ativo = novoStatus;

      }).catch(erro => this.errorHandler.handle(erro));
  }

}
