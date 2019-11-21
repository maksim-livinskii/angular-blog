import {Injectable} from "@angular/core";
import {User} from "../../shared/interfaces";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

export class UserService {
  constructor(private http: HttpClient){}

  public saveInformation(user: User): Observable<object> {
    return this.getInformationByUserId(user.id).pipe(
      switchMap(data=>{
        return this.http.patch<object>(`${environment.fb_db_link}/users/${user.id}.json`, user);
      })
    );
  }

  public getInformationByUserId(id):Observable<object>{
    return this.http.get<object>(`${environment.fb_db_link}/users.json?orderBy=%22id%22&equalTo=%22${id}%22`).pipe(
      map((response)=> response[Object.keys(response)[0]])
    )
  }

  public getAllUsers(){

  }
}
