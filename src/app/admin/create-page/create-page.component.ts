import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/posts.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      author: new  FormControl('', [Validators.required])
    });
  }

  addPost() {
    if(this.form.invalid) return;

    const post: Post = {
      title: this.form.value.title,
      content: this.form.value.content,
      author: this.form.value.author,
      date: new Date()
    };

    this.postsService.create(post)
      .subscribe(post=>{
        console.log(post);
        this.form.reset();
      })
  }
}
