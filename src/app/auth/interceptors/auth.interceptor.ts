import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService, private router: Router){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.isAuthenticated()){
      req = req.clone({
        setParams:{
          auth: this.authService.token
        }
      });
    }

    return next.handle(req)
      .pipe(
        catchError((err:HttpErrorResponse) => {
          console.log('[Interceptor Error]: ', err);
          if(err.status === 401){
            this.authService.logout();
            this.router.navigate(['/auth', 'login'], {
              queryParams: {
                authFailed: true
              }
            });
          }
          return throwError(err);
        })
      )
  }

}
