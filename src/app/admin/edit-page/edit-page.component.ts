import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { PostsService } from "../../shared/posts.service";
import { Post } from "../../shared/interfaces";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { switchMap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { AlertService } from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submited = false;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });


    this.form = this.fb.group({
      id: [],
      title: [, [Validators.required]],
      content: this.fb.group({
        id: [],
        title: [, [Validators.required]],
      })
    });

    this.route.params.pipe(
      switchMap(
        params => this.postsService.getById(params.id))
    )
      .subscribe((post: Post) => {
        this.form.setValue(post);
      });
  }

  updatePost() {
    if (this.form.invalid) return;

    this.submited = true;



    this.sub = this.postsService.update(this.form.getRawValue())
      .subscribe(post => {
        this.form.reset();
        this.submited = false;
        this.alertService.success('Пост изменен');
      })
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

}
