import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  Post,
  Comment,
  iMDB,
  iMDBRes,
  User,
  dataSearch,
} from 'src/app/types/api-types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public _refreshNeeded$ = new Subject<any>();

  get refreshNeeded() {
    return this._refreshNeeded$;
  }

  private _isOwner$ = new BehaviorSubject<boolean>(false);
  public isOwner$ = this._isOwner$.asObservable();

  public _isWished$ = new BehaviorSubject<boolean>(false);
  public isWished$ = this._isWished$.asObservable();

  public _isVoted$ = new BehaviorSubject<boolean>(false);
  public isVoted$ = this._isVoted$.asObservable();

  catalogPosts: Post[] = [];
  daletedId: any = null;

  constructor(private http: HttpClient) {}

  login(email: string | null, password: string | null) {
    const answer = this.http.post(environment.appUrl + '/users/login', {
      email,
      password,
    });
    console.log(answer);

    return answer;
  }

  register(
    email: string | null,
    password: string | null,
    rePassword: string | null,
    gender: string | null
  ) {
    const answer = this.http.post(environment.appUrl + '/users/register', {
      email,
      password,
      rePassword,
      gender,
    });
    console.log(answer);
    return answer;
  }

  getRecords() {
    return this.http.get<Post[]>(environment.appUrl + '/movies').pipe(
      tap((response) => {
        if (response.find((x) => x._id === this.daletedId)) {
          response.filter((x) => x._id !== this.daletedId);
        }
      })
    );

  }

  createRecord(data: Post) {
    const response = this.http.post<Post>(environment.appUrl + '/movies', data);
    console.log(response);
    return response;
  }

  getItemById(id: string) {
    return this.http.get<Post>(environment.appUrl + '/movies/' + id).pipe(
      tap((response: any) => {
        console.log(response)
        this._refreshNeeded$.next('test');
        let currentUser = localStorage.getItem('userId');
        if (response._ownerId._id === currentUser) {
          this._isOwner$.next(true);
        } else {
          this._isOwner$.next(false);
        }

        if (response.wishingList.includes(currentUser)) {
          this._isWished$.next(true);
        } else {
          this._isWished$.next(false);
        }

        if (response.likedBy.includes(currentUser)) {
          this._isVoted$.next(true);
        } else {
          this._isVoted$.next(false);
        }
      })
    );
  }

  editRecord(id: any, data: Post) {
    const res = this.http.put<Post>(environment.appUrl + '/movies/' + id, data);
    console.log(res);
    return res;
  }

  getAllCommentsForRecord(id: any) {
    const res = this.http.get<Comment[]>(
      environment.appUrl + '/comments/' + id
    );
    return res;
  }

  deleteRecord(id: any) {
    return this.http.delete(environment.appUrl + '/movies/' + id).pipe(
      tap(() => {
        this.daletedId = id;
        this._refreshNeeded$.next("deleted")
      }))
  }

  addComment(data: Comment) {
    const response = this.http.post<Comment>(
      environment.appUrl + '/comments/',
      data
    );
    console.log(response);

    return response;
  }

  imdbSearch(title: string) {
    let arrayTitle = title.split(' ');
    let searching: string = '';
    console.log(arrayTitle);
    if (arrayTitle.length != 0) {
      searching = arrayTitle.map((x) => x + '%20').toString();
      console.log(searching);
    }
    const response = this.http.get<iMDBRes>(
      `https://imdb8.p.rapidapi.com/auto-complete?q=${searching}`,
      {
        headers: {
          'X-RapidAPI-Key':
            '1f896608b2mshb3615bd17878f8dp1dcfe8jsncefc519ffd08',
          'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
        },
      }
    );

    console.log(response);
    return response;
  }

  getUser() {
    const response = this.http.get<User>(environment.appUrl + `/users/`);
    return response;
  }

  getMyWishList(id: any) {
    const response = this.http.get<Post[]>(
      environment.appUrl + `/movies/` + id
    );
    return response;
  }

  getMyRecords(id: any) {
    const response = this.http.get<Post[]>(
      environment.appUrl + `/movies/` + id
    );
    return response;
  }

  searchFunction(data: dataSearch) {
    const response = this.http.post<Post[]>(
      environment.appUrl + '/search',
      data
    );
    return response;
  }

  getVoted(id: any, data: Post) {
    return this.http.put<Post>(environment.appUrl + '/movies/' + id, data).pipe(
      tap(() => {
        this._isVoted$.next(true);
        this._refreshNeeded$.next("voted")
      })
    );
  }

  getWished(id: any, data: Post) {
    return this.http.put<Post>(environment.appUrl + '/movies/' + id, data).pipe(
      tap(() => {
        this._isWished$.next(true);
        this._refreshNeeded$.next("wished")
      })
    );
  }
}
