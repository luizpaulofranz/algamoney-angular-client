import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private toasty: ToastyService,
    // para pegar dados da URL (definidos nas rotas)
    private route: ActivatedRoute,
    // para fazer redirects
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Novo Lançamento');
    // assim pegamos dados das rotas
    const id = this.route.snapshot.params['id'];
    this.carregarLancamento(id);

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

  carregarLancamento(id: number) {
    if (id) {
      this.lancamentoService.getById(id).then(
        // quando resolver a promise, atribuimos ao nosso lancamento
        response => {
        this.lancamento = response;
        // atualizmo o titulo da pagina
        this.getPageTitleOnEdit();
      }).catch(error => this.errorHandler.handle(error));
    }
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

  // trata se eh edicao ou novo
  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then((newLancamento) => {
        this.toasty.success('Lançamento adicionado com sucesso!');
        // limpa o form
        // form.reset();
        // this.lancamento = new Lancamento();

        // faz o redirect para outra URL de edicao de lancamento
        this.router.navigate(['lancamentos/', newLancamento.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;

        this.toasty.success('Lançamento alterado com sucesso!');
        this.getPageTitleOnEdit();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo (form: FormControl) {
    // limpa o form
    form.reset();
    this.lancamento = new Lancamento();
    this.router.navigate(['lancamentos/novo']);
  }

  getPageTitleOnEdit() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
