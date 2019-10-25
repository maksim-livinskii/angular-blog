import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  postId: string;
  form: FormGroup;
  submited = false;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.route.params.pipe(
        switchMap(
          (params: Params) => {
            return this.postsService.getById(params.id)
          })
      )
      .subscribe((post: Post)=>{
        this.postId = post.id;
        this.form = new FormGroup({
          title: new FormControl(post.title, [Validators.required]),
          content: new FormControl(post.content, [Validators.required])
        });
    });
  }

  updatePost() {
    if(this.form.invalid) return;

    this.submited = true;

    const data = {
      title: this.form.value.title,
      content: this.form.value.content
    };

    this.sub = this.postsService.update(this.postId,data)
      .subscribe(post=>{
        this.form.reset();
        this.submited = false;
        this.alertService.success('Пост изменен');
      })
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }

}
