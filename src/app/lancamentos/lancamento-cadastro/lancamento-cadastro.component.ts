import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})

export class LancamentoCadastroComponent implements OnInit {


  public categorias = [];

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  pessoas = [
    { label: 'João da Silva', value: 4 },
    { label: 'Sebastião Souza', value: 9 },
    { label: 'Maria Abadia', value: 3 },
  ];

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();
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

}
