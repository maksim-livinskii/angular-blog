import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Post} from "../../../shared/interfaces";
import {switchMap} from "rxjs/operators";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-view-page',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

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
