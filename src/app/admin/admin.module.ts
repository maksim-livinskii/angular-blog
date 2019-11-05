import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {AuthGuard} from "../auth/services/auth.guard";
import {SearchPipe} from "./shared/search.pipe";
import { AlertComponent } from './shared/components/alert/alert.component';
import {AlertService} from "./shared/services/alert.service";
import {AuthModule} from "../auth/auth.module";
import {LoginFormComponent} from "../auth/login-form/login-form.component";
import {PostModule} from "../post/post.module";
import {PostUpsertComponent} from "../post/components/post-upsert/post-upsert.component";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardPageComponent,
    SearchPipe,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginFormComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'create', component: PostUpsertComponent, canActivate: [AuthGuard]},
          {path: 'post/:id/edit', component: PostUpsertComponent, canActivate: [AuthGuard]}
        ]
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    PostModule
  ],
  providers:[
    AlertService
  ],
  exports: [RouterModule]
})
export class AdminModule {

}
