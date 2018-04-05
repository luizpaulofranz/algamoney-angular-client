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
    // data roles eh o que passamos nas rotas
    // simplesmente verificamos se o usuario tem as permissoes necessarias para a rota
    // as permissoes sao passadas na propria rota, dentro de data
    if (next.data.roles && !this.auth.hasAnyPermission(next.data.roles)) {
      // diewcionamos para essa rota, definida no app-routing.module
      this.router.navigate(['/nao-autorizado']);
      return false;
    }

    return true;
}
}
