import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../shared/services/alert.service";
import {UserService} from "../user/services/user.service";
import {User} from "../shared/interfaces";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy{

  public user:User;
  private unsub$ = new Subject<any>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.alertService.info('Вы вышли.');
  }

  ngOnInit(): void {
    this.userService.getInformationByUserId(this.authService.currentUserId()).pipe(
      takeUntil(this.unsub$)
    ).subscribe((user:User)=> this.user = user);
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
