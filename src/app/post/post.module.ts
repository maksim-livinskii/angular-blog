import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostUpsertComponent } from './components/post-upsert/post-upsert.component';
import {PostsService} from "./services/posts.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {PostViewComponent} from "./components/post-view/post-view.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    PostUpsertComponent,
    PostViewComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    PostsService
  ]
})
export class PostModule { }
