import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PostViewComponent} from "./post/components/post-view/post-view.component";
import {Page404Component} from "./shared/components/page404/page404.component";


const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'}, // редирект на корневой элемент для корректного отображения компонента
      {path: '', component: HomePageComponent},
      {path: 'post/:id', component: PostViewComponent},
      {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
    ]},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  {path: '404', component: Page404Component},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
