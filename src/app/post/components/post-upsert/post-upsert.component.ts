import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {iif, Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {AlertService} from "../../../admin/shared/services/alert.service";
import {Post} from "../../../shared/interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {filter, map, switchMap, tap} from "rxjs/operators";
import {placeholdersToParams} from "@angular/compiler/src/render3/view/i18n/util";

@Component({
  selector: 'app-post-upsert',
  templateUrl: './post-upsert.component.html',
  styleUrls: ['./post-upsert.component.scss']
})
export class PostUpsertComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submited = false;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertService: AlertService
  ) {
    this.form = new FormBuilder().group({
      id: [''],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      author: ['', [Validators.required]],
      date: ['']
    });

  }

  ngOnInit() {
    this.sub = this.route.params.pipe(
      filter(params=>params.id),
      switchMap(params=> this.postsService.getById(params.id))
    ).subscribe((post: Post) => {
      this.form.setValue(post);
    });


  }

  private addPost() {
    this.submited = true;

    const post: Post = {
      ...this.form.value,
      date: new Date()
    };

    this.sub = this.postsService.create(post)
      .subscribe(post=>{
        this.form.reset();
        this.submited = false;
        this.alertService.success('Пост создан');
      })
  }

  private updatePost() {
    this.submited = true;

    const data = {
      title: this.form.value.title,
      content: this.form.value.content
    };

    this.sub = this.postsService.update(this.form.get('id').value,data)
      .subscribe(post=>{
        this.submited = false;
        this.alertService.success('Пост изменен');
      });
  }

  upsetrPost() {
    if(this.form.invalid) return;

    if(this.form.get('id').value){
      this.updatePost();
    }
    else{
      this.addPost();
    }
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }


}
