import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service.service';
import { AuthServiceService } from 'src/app/services/authservice.service';
import { Post } from 'src/app/types/api-types';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(    
    public apiService: ApiService,
    private route: ActivatedRoute,
    public authService: AuthServiceService,
    private router: Router) { }


    private sub: any;
    currentPost: Post = {
      movieName: '',
      artist: null,
      director: null,
      description: null,
      year: null,
      imageUrl: null,
      genre: null,
      likes: 0,
      likedBy: [],
      wishingList: null,
      createdAt: null,
      updatedAt: null,
    };
  
    id: any;
    raiting: any = 0;
    voteForm = new FormGroup({
      rate: new FormControl(''),
    });




    getCurrent(id:any){

      const res = this.apiService.getItemById(id).subscribe((post) => {
        this.apiService.isOwner$.subscribe((status) => {
          console.log('is owner' + ' ' + status);
          this.apiService._refreshNeeded$.next(status);
        });
  
        this.apiService.isWished$.subscribe((status) => {
          console.log('is wished' + ' ' + status);
          this.apiService._refreshNeeded$.next(status);
        });
  
        this.apiService.isVoted$.subscribe((status) => {
          console.log('is voted' + ' ' + status);
          this.apiService._refreshNeeded$.next(status);
        });
  
        this.apiService._refreshNeeded$.next(post);
        this.currentPost = post;
        console.log(post);
  
        if (
          this.currentPost.likes != 0 &&
          this.currentPost.likedBy?.length != 0 &&
          this.currentPost.likes != undefined &&
          this.currentPost.likedBy?.length != undefined
        ) {
          let likes: number = this.currentPost.likes;
          let liked: number = this.currentPost.likedBy?.length;
          this.raiting = (likes / liked).toFixed(2);
          this.currentPost.raiting = this.raiting
          console.log(this.raiting);
        } else {
          this.raiting = 0;
        }
      });
      console.log(res)

      return this.currentPost
    }










}




