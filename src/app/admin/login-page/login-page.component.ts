import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  submitted = false;
  form: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

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

  submitForm() {
    if(this.form.invalid) return;

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.authService.login(user).subscribe(()=>{
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, ()=>{
      this.submitted = false;
    })
  }
}
