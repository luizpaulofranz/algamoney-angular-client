import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { Pessoa } from './../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoasService } from '../pessoas.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoasService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.toasty.success('Pessoa adicionada com sucesso!');

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
