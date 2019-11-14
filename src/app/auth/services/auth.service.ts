import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAuthResponse, User} from "../../shared/interfaces";
import {Observable, BehaviorSubject, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

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
    private http: HttpClient
  ){}

  login(user: User):Observable<any>{
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  setAuthError(message){
    console.log(message);

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

  private setToken(response: FbAuthResponse | null){
    if(response){
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expData.toString());
    }
    else {
      localStorage.clear();
    }
  }
}