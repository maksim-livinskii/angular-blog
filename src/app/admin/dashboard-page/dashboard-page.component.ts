import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../post/services/posts.service";
import {Subscription} from "rxjs";
import {Post} from "../../shared/interfaces";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.pSub = this.postsService.getPosts().subscribe(posts => this.posts = posts);
  }

  remove(id: string) {
    this.dSub = this.postsService.delete(id)
      .subscribe(()=>{
        this.posts.splice(this.posts.findIndex(post => post.id == id), 1);
        this.alertService.warning(`Пост удален`);
      });
  }

  ngOnDestroy(): void {
    if(this.pSub) this.pSub.unsubscribe();
    if(this.dSub) this.dSub.unsubscribe();
  }
}
