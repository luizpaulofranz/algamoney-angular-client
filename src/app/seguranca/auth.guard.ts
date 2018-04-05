import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // primeiro verificamos se usuario nao tem nem token, vai para o login
    // caso tenha token e nao tenha permissao, cai no else if
    if (this.auth.isAccessTokenInvalid()) {
      // tentamos obter novo token
      this.auth.getNewAccessToken();
      // se continua invalido vai para login
      if (this.auth.isAccessTokenInvalid()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    // data roles eh o que passamos nas rotas
    // simplesmente verificamos se o usuario tem as permissoes necessarias para a rota
    // as permissoes sao passadas na propria rota, dentro de data
    } else if (next.data.roles && !this.auth.hasAnyPermission(next.data.roles)) {
      // diewcionamos para essa rota, definida no app-routing.module
      this.router.navigate(['/nao-autorizado']);
      return false;
    }

    return true;
}
}
