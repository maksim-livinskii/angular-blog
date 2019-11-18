import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  public registration = false;

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

    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  private authMethod(user):Observable<any>{
    if(this.registration){
      return this.authService.singUp(user);
    }
    else{
      console.log(333);
      return this.authService.login(user);
    }
  }

  submitForm() {
    if(this.form.invalid) return;

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    console.log(123);

    this.authMethod(user).subscribe(()=>{
      console.log(222);
      this.form.reset();
      this.router.navigate(['/']);
      this.submitted = false;
    }, ()=>{
      this.submitted = false;
    })
  }
}
