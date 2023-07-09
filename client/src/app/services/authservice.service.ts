import { ChangeDetectorRef, Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();


  get token(){
    return localStorage.getItem('authToken')
  }

  constructor(private apiService:ApiService) {
    this._isLoggedIn$.next(!!this.token);
  }


  login(email:string | null, passowrd:string | null){
    return this.apiService.login(email,passowrd).pipe(
      tap((response:any) => {
        if(!response.hasOwnProperty('errors')){
          this._isLoggedIn$.next(true);
          localStorage.setItem('email', response.email);
          localStorage.setItem('authToken', response.accessToken);
          localStorage.setItem('userId', response._id);
          console.log(response)
          return response

      } else {
          console.log(response)
          return response;
      }

      })
      
    )
  }


  register(email:string | null, password:string | null, rePassword:string | null, gender:string | null) {
    return this.apiService.register(email,password, rePassword, gender).pipe(
      tap((response:any) => {
        if(!response.hasOwnProperty('errors')){
          this._isLoggedIn$.next(true);
          localStorage.setItem('email', response.email);
          localStorage.setItem('authToken', response.accessToken);
          localStorage.setItem('userId', response._id);

          console.log(response)
          return response

      } else {
          console.log(response)
          return response;
      }

      })
      
    )
  }


  logout(){

    this._isLoggedIn$.next(false);
    localStorage.removeItem('email');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');

  }

}
