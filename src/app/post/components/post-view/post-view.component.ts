import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Post } from "../../../shared/interfaces";
import { switchMap, filter } from "rxjs/operators";
import { PostsService } from "../../services/posts.service";

@Component({
  selector: 'app-view-page',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

  public post$: Observable<Post>;

  constructor(private route: ActivatedRoute, private postsService: PostsService) { }

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      filter(params => params.id),
      switchMap(params => this.postsService.getById(params.id))
    )
  }

}
