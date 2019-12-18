import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "./services/user.service";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "../auth/guards/auth.guard";
import {UserPageComponent} from "./components/user-page/user-page.component";



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
