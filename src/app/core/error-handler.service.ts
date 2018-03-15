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
    } else {
      msg = 'Erro ao processar o serviço remoto!';
      console.log('Ocorreu um erro!', errorResponse);
    }

    this.toasty.error(msg);
  }

}
