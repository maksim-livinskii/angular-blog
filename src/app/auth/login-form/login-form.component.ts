import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserRequest} from "../../shared/interfaces";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  public registration = false;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    if(this.authService.isAuthenticated()) this.router.navigate(['/']);

    /** попытка пойти на урл без авторизации */
    this.route.queryParams.subscribe((params: Params) => {
      if(params.loginAgain) {
        this.authService.setAuthError('Где авторизация <img src="https://sun9-47.userapi.com/c849428/v849428497/82739/NoZWFOOK8Xc.jpg"> ?!');
      }
      if(params.authFailed){
        this.authService.setAuthError('<img src="https://media0.giphy.com/media/wYyTHMm50f4Dm/giphy.gif">');
      }
    });
  }

  private authMethod(user):Observable<any>{
    if(this.registration){
      return this.authService.singUp(user);
    }
    else{
      return this.authService.login(user);
    }
  }

  submitForm(user:UserRequest) {
    this.authMethod(user).pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe(() => this.router.navigate(['/']));
  }

  changeTab(event:NgbTabChangeEvent) {
    this.registration = event.nextId == 'tab-reg';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
