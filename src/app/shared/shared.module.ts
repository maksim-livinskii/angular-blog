import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import { LoaderComponent } from './components/loader/loader.component';
import {Page404Component} from "./components/page404/page404.component";
import {AlertService} from "./services/alert.service";
import {AlertComponent} from "./components/alert/alert.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    LoaderComponent,
    AlertComponent
  ],
  declarations: [
    LoaderComponent,
    Page404Component,
    AlertComponent
  ],
  providers:[AlertService]
})
export class SharedModule {

}
