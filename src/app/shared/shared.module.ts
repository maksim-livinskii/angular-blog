import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import { LoaderComponent } from './components/loader/loader.component';
import {Page404Component} from "./components/page404/page404.component";

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    LoaderComponent
  ],
  declarations: [LoaderComponent, Page404Component],
})
export class SharedModule {

}
