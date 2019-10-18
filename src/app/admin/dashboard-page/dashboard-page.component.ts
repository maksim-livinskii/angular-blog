import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Observable, Subscription} from "rxjs";
import {Post} from "../../shared/interfaces";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[];
  pSub: Subscription;
  searchStr = '';

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.pSub = this.postsService.getPosts().subscribe(posts => this.posts = posts);
  }

  ngOnDestroy(): void {
    if(this.pSub) this.pSub.unsubscribe();
  }

  remove(id: string) {
    this.postsService.delete(id)
      .subscribe(()=>{
        console.log(id);
        console.log(this.posts[this.posts.findIndex(post => post.id == id)]);
        console.log(this.posts.findIndex(post => post.id == id));
        this.posts.splice(this.posts.findIndex(post => post.id == id), 1);
        this.posts.splice(0, 1);
        console.log(this.posts);
      });
  }
}
