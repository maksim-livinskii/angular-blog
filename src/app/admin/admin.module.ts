import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {SearchPipe} from "./shared/search.pipe";
import {PostModule} from "../post/post.module";
import {PostUpsertComponent} from "../post/components/post-upsert/post-upsert.component";
import {AdminGuard} from "./guards/admin.guard";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardPageComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, canActivate: [AdminGuard], children: [
          {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
          {path: 'dashboard', component: DashboardPageComponent},
          {path: 'create', component: PostUpsertComponent},
          {path: 'post/:id/edit', component: PostUpsertComponent}
        ]
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PostModule
  ],
  providers:[
    AdminGuard
  ]
})
export class AdminModule {

}
