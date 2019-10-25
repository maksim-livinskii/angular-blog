import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/posts.service";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submited = false;
  sub: Subscription;

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      author: new  FormControl('', [Validators.required])
    });
  }

  addPost() {
    if(this.form.invalid) return;

    this.submited = true;

    const post: Post = {
      title: this.form.value.title,
      content: this.form.value.content,
      author: this.form.value.author,
      date: new Date()
    };

    this.sub = this.postsService.create(post)
      .subscribe(post=>{
        console.log(post);
        this.form.reset();
        this.submited = false;
        this.alertService.success('Пост создан');
      })
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }


}
