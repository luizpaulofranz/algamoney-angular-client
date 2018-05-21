import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { Pessoa, Contato, Estado } from './../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoasService } from '../pessoas.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  selectedState: Estado;

  constructor(
    private pessoaService: PessoasService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    // para pegar dados da URL (definidos nas rotas)
    private route: ActivatedRoute,
    // para fazer redirects
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova Pessoa');
    this.carregarEstados();
    // assim pegamos dados das rotas
    const id = this.route.snapshot.params['id'];
    this.carregarPessoa(id);
  }

  carregarEstados () {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(estado => ({ label: estado.nome, value: estado.id}));
    }).catch(error => this.errorHandler.handle(error));
  }

  selectState() {
    this.pessoaService.pesquisarCidades(this.selectedState).then(lista => {
      this.cidades = lista.map(cidade => ({ label: cidade.nome, value: cidade.id}));
    }).catch(error => this.errorHandler.handle(error));
  }

  carregarPessoa(id: number) {
    if (id) {
      this.pessoaService.getById(id).then(
        // quando resolver a promise, atribuimos ao nosso lancamento
        response => {
        this.pessoa = response;
        // atualizamos o titulo da pagina
        this.getPageTitleOnEdit();
      }).catch(error => this.errorHandler.handle(error));
    }
  }

  get editando() {
    return Boolean(this.pessoa.id);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  adicionar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then((newPessoa) => {
        this.toasty.success('Pessoa adicionada com sucesso!');
        this.router.navigate(['pessoas/', newPessoa.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then((pessoa) => {
        this.pessoa = pessoa;

        this.toasty.success('Pessoa alterada com sucesso!');
        this.getPageTitleOnEdit();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo (form: FormControl) {
    // limpa o form
    form.reset();
    this.pessoa = new Pessoa();
    this.router.navigate(['pessoas/novo']);
  }

  getPageTitleOnEdit() {
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
  }

}
