import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/toPromise';
import { ToastyService } from 'ng2-toasty';

import { PessoasService } from '../../pessoas/pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from './../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})

export class LancamentoCadastroComponent implements OnInit {


  public categorias = [];
  public pessoas = [];
  public lancamento = new Lancamento();

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoasService,
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        // para cada elemento do array atualiza o array
        // com isso convertemos o array da API para o array do componente do primeNg
        this.categorias = categorias.map( categoria => {
          return { label: categoria.nome, value: categoria.id };
        });
      }).catch(error => this.errorHandler.handle(error));
  }

  carregarPessoas() {
    return this.pessoasService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map( pessoa => {
          return { label: pessoa.nome, value: pessoa.id };
        });
      }).catch(error => this.errorHandler.handle(error));
  }

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
