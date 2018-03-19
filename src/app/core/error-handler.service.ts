import { Injectable } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    // esse if nao funcionou nao sei por que
    // } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status < 500) {
    } else if (errorResponse.status >= 400 && errorResponse.status < 500) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';
      // tentamos converter o response para json
      try {
        errors = errorResponse.json();
        msg = errors[0].message;
      } catch (e) {
        console.error('Ocorreu um erro', errorResponse);
      }
      // msg = errorResponse[0].menssagemUsuario;

    } else {
      msg = 'Erro ao processar o serviço remoto!';
      console.log('Ocorreu um erro!', errorResponse);
    }

    this.toasty.error(msg);
  }

}
