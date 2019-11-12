import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import { LoaderComponent } from './components/loader/loader.component';

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
  declarations: [LoaderComponent],
})
export class SharedModule {

}
