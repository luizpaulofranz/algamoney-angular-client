import { Injectable } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    // aqui tratamos o erro de RefreshToken expirado
    } else if (errorResponse instanceof ExpiredRefreshTokenError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    // esse if nao funcionou nao sei por que
    // } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status < 500) {
    } else if (errorResponse.status >= 400 && errorResponse.status < 500) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';
      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar essa ação!';
      }
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

export class ExpiredRefreshTokenError {}
