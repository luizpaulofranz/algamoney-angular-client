import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
// monte de imports para formularios reativos
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  // public lancamento = new Lancamento();

  // objeto que contem o formulario reativo
  public formulario: FormGroup;

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
    private title: Title,
    // Para forms reativos
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // configuramos o form reativo
    this.configForm();
    this.title.setTitle('Novo Lançamento');
    // assim pegamos dados das rotas
    const id = this.route.snapshot.params['id'];
    this.carregarLancamento(id);

    this.carregarCategorias();
    this.carregarPessoas();
  }

  // acrescentamos o nosso token de acesso à requisiscao
  antesUploadAnexo(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  /* Configuracoes iniciais do form reativo */
  configForm() {
    this.formulario = this.formBuilder.group({
      // campo do form: [valor inicial, validadores]
      id: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      // quando se trata de um "nested object" criamos outro grupo
      pessoa: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  // verifica se estamos editando, o get permite acessar "editando no template"
  get editando() {
    // return Boolean(this.lancamento.id);

    // assim recuperamos propriedades de formularios reativos
    return Boolean(this.formulario.get('id').value);
  }

  carregarLancamento(id: number) {
    if (id) {
      this.lancamentoService.getById(id).then(
        // quando resolver a promise, atribuimos ao nosso lancamento
        response => {
        // this.lancamento = response;

        // setamos dados no form reativo
        // this.formulario.setValue(response);
        // patchValue atualiza apenas a propriedades declaradas em formulario
        // setValue sobrescreve essas propriedades
        this.formulario.patchValue(response);
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
  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    // passamos os dados do form reativo
    this.lancamentoService.adicionar(this.formulario.value)
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

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then((lancamento) => {
        // this.lancamento = lancamento;
        // patchValue atualiza apenas a propriedades declaradas em formulario
        // setValue sobrescreve essas propriedades
        this.formulario.patchValue(lancamento);

        this.toasty.success('Lançamento alterado com sucesso!');
        this.getPageTitleOnEdit();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo () {
    // limpa o form
    this.formulario.reset();
    // this.lancamento = new Lancamento();
    this.router.navigate(['lancamentos/novo']);
  }

  getPageTitleOnEdit() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }

}
