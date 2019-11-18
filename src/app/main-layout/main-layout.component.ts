import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/services/auth.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public authStatus$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authStatus$ = this.authService.authStatus$;
  }

  logout() {
    this.authService.logout();
  }
}
