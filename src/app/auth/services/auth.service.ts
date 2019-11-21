import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAuthResponse, User, UserRequest} from "../../shared/interfaces";
import {Observable, BehaviorSubject, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {UserService} from "../../user/services/user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  public error$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get token(): string{
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if(new Date() > expDate){
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ){}

  login(user: UserRequest):Observable<any>{
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((res:FbAuthResponse)=> {
            this.setToken(res);
          }
        ),
        switchMap((res:FbAuthResponse)=>{
          return this.userService.getInformationByUserId(res.localId);
        }),
        catchError(this.handleError.bind(this))
      )
  }

  singUp(user: UserRequest):Observable<any>{
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,user)
      .pipe(
        tap((res:FbAuthResponse)=>this.setToken(res)),
        map((res:FbAuthResponse)=>{
          return {id:res.localId, email: user.email, name: ''};
        }),
        switchMap((user:User)=>{
          return this.userService.saveInformation(user);
        }),
        catchError(this.handleError.bind(this))
      )
  }

  setAuthError(message){
    this.error$.next(message);
  }

  private handleError(error: HttpErrorResponse){
    const {message} = error.error.error;

    console.log(message);

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Ненайден email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
      case 'EMAIL_EXISTS' :
        this.error$.next('Этот email уже зарегистрирован');
        break;
      default:
        break;
    }

    return throwError(error);
  }

  logout(){
    this.setToken(null);
  }

  isAuthenticated(){
    return !!this.token;
  }

  isAdmin(){
    return !!localStorage.getItem('isAdmin');
  }

  private setToken(response: FbAuthResponse | null){
    if(response){
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expData.toString());
      localStorage.setItem('fb-user-id', response.localId);
      if("2RsSIRuTDfMfeJVVvCzenloay0C3" == response.localId){
        localStorage.setItem('isAdmin', "1");
      }
    }
    else {
      localStorage.clear();
    }
  }
}
