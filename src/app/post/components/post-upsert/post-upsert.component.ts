import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../../services/posts.service";
import {Post} from "../../../shared/interfaces";
import {ActivatedRoute} from "@angular/router";
import {filter, takeUntil, switchMap, map, finalize} from "rxjs/operators";
import {placeholdersToParams} from "@angular/compiler/src/render3/view/i18n/util";
import {Subject} from "rxjs";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-post-upsert',
  templateUrl: './post-upsert.component.html',
  styleUrls: ['./post-upsert.component.scss']
})
export class PostUpsertComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submited = false;
  unsubscribe$ = new Subject();

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
      date: []
    });

  }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.unsubscribe$),
      filter(params => params.id),
      switchMap(params => this.postsService.getById(params.id).pipe(
        map(post=>({...post, id:params.id}))
      ))
    ).subscribe((post: Post) => {
      this.form.setValue(post);
    });
  }

  submitPost() {
    if(this.form.invalid) return;
    this.submited = true;
    this.submitMethod(this.form.getRawValue())
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(()=>this.submited = false)
      )
      .subscribe(()=>{
        this.submited = false;
        this.alertService.success(`Пост ${this.form.get('id').value? 'изменен':'создан'}`);
      });
  }

  private submitMethod(post: Post) {
    return post.id ?
      this.postsService.update(post) :
      this.postsService.create(post);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
