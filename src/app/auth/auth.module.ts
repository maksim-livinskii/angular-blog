import {NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginFormComponent} from "./login-form/login-form.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./guards/auth.guard";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { FormFieldsComponent } from './form-fields/form-fields.component';

/** регистрация интерсепторов */

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    LoginFormComponent,
    FormFieldsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild([
      {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
      {path: 'login', component: LoginFormComponent}
    ])
  ],
  providers: [
    INTERCEPTOR_PROVIDER,
    AuthGuard
  ]
})
export class AuthModule { }
