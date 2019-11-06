import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FbCreateResponse, Post } from "../../shared/interfaces";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { delay, map, filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient) { }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.fb_db_link}/posts.json`, { ...post, date: new Date() });
  }

  update(post): Observable<object> {
    return this.http.patch(`${environment.fb_db_link}/posts/${post.id}.json`, post);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fb_db_link}/posts/${id}.json`);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get(`${environment.fb_db_link}/posts.json`)
      .pipe(
        delay(500),
        filter(response => !!response),
        map(res => Object.keys(res).map(key => ({ ...res[key], id: key })))
      )
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fb_db_link}/posts/${id}.json`)
  }
}
