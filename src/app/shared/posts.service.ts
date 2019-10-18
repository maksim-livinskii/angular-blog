import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FbCreateResponse, Post} from "./interfaces";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {delay, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient){}

  create(post:Post):Observable<Post>{
    return this.http.post(`${environment.fb_db_link}/posts.json`,post)
      .pipe(
        map((response: FbCreateResponse)=>{
          return  {
            ...post,
            id: response.name,
            date: new Date(post.date)
          }
        })
      )
  }

  delete(id:string):Observable<void>{
    return  this.http.delete<void>(`${environment.fb_db_link}/posts/${id}.json`)
      .pipe(
        tap(()=>{
          console.log(id);
        })
      );
  }

  getPosts():Observable<Post[]>{
    return this.http.get(`${environment.fb_db_link}/posts.json`)
      .pipe(
        delay(1000),
        map((response:{[key:string]:any})=>{
          if(response){
            return Object.keys(response)
              .map(key => ({
                ...response[key],
                id: key,
                date: new Date(response[key].date)
              }))
          }

          return [];
        })
      )
  }
}
