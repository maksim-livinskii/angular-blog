import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../post/services/posts.service";
import {Subject} from "rxjs";
import {Post} from "../../shared/interfaces";
import {takeUntil} from "rxjs/operators";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[];
  searchStr = '';
  unsub$ = new Subject();

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.postsService.getPosts().pipe(
      takeUntil(this.unsub$)
    )
      .subscribe(posts => this.posts = posts);
  }

  remove(id: string) {
    this.postsService.delete(id).pipe(
      takeUntil(this.unsub$)
    )
      .subscribe(()=>{
        this.posts.splice(this.posts.findIndex(post => post.id == id), 1);
        this.alertService.warning(`Пост удален`);
      });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
