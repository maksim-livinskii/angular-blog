import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

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
    this.route.queryParams.subscribe(params => {
      console.log(params.loginAgain);
      if(params.loginAgain) {
        console.log('loginAgain',params.loginAgain);
        this.authService.setAuthError('Где авторизация <img src="https://cs7.pikabu.ru/images/big_size_comm/2018-09_4/1537425290182481988.jpg"> ?!');
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

  // ngAfterViewInit(): void {
  //
  //   console.log('ngAfterContentChecked');
  //   /** попытка пойти на урл без авторизации */
  //   this.route.queryParams.subscribe(params => {
  //     console.log(params.loginAgain);
  //     if(params.loginAgain) {
  //       console.log('loginAgain',params.loginAgain);
  //       this.authService.error$.next('Где авторизация <img src="https://cs7.pikabu.ru/images/big_size_comm/2018-09_4/1537425290182481988.jpg"> ?!');
  //     }
  //   });
  // }
}
