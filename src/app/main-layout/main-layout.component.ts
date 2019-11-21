import { Component } from '@angular/core';
import {AuthService} from "../auth/services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  constructor(private authService: AuthService, private router: Router, private alert: AlertService) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.alert.info('Вы вышли.');
  }
}
