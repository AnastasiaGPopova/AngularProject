import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthServiceService } from './authservice.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthServiceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let realToken = this.authService.token

    if(realToken != null){
      req = req.clone({
        headers: req.headers.set('X-Authorization', realToken)
      })
    }


    return next.handle(req).pipe(
      catchError(errorData => {
        if(errorData.status === 401){
          this.authService.logout()
        }

        if(errorData.message.includes("Unknown Error")){
          alert(`Our Server is currently down! Please try again later!`)
        } else {
          alert(errorData.message)
        }

        return throwError(errorData)
      })
    )
  }
}


export const AuthTokenProvider ={
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptorService,
  multi: true
}
