import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from '../error-handler.service';
import { LogoutService } from './../../seguranca/logout-service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu = false;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      }).catch(error => {
        this.errorHandler.handle(error);
      });
  }

}
