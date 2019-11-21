import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "./services/user.service";
import { UserPageComponent } from './user-page/user-page.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "../auth/services/auth.guard";



@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: UserPageComponent, canActivate: [AuthGuard]}
    ])
  ],
  providers:[
    UserService
  ]
})
export class UserModule { }
