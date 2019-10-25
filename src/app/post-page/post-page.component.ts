import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Post} from "../shared/interfaces";
import {switchMap} from "rxjs/operators";
import {PostsService} from "../shared/posts.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  public post:Post;

  constructor(private route: ActivatedRoute, private postsService: PostsService) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          return this.postsService.getById(params.id)
        })
    ).subscribe((post: Post)=>{
      this.post = post;
    });
  }

}
