import { Component, OnInit, Input } from '@angular/core';
import { Contato } from '../../core/model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  contato: Contato;
  showFormContato = false;
  contatoIndex: number;

  constructor() { }

  ngOnInit() {

  }

  newContato() {
    this.showFormContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  editContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.showFormContato = true;
    this.contatoIndex = index;
  }

  confirmarContato(frm: FormControl) {
    // precisamos clonar o objeto para dar o push, pois caso
    // mantenhamos this.contato, ao alterarmos esse, vai atualizar o grid
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    // this.pessoa.contatos.push(this.clonarContato(this.contato));
    this.showFormContato = false;
    frm.reset();
  }

  removeContato(index: number) {
    this.contatos.splice(index, 1);
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.id,
      contato.nome, contato.email, contato.telefone);
  }

  get editando() {
    return this.contato && this.contato.id;
  }

}
