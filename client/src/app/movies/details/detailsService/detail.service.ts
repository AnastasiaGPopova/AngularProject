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
    // raiting: any = 0;
    voteForm = new FormGroup({
      rate: new FormControl(''),
    });
    allComments: Comment[] = [];

    getRaiting(currentPost:Post){
      let raiting:string | number

      if (
        currentPost.likes != 0 &&
        currentPost.likedBy?.length != 0 &&
        currentPost.likes != undefined &&
        currentPost.likedBy?.length != undefined
      ) {
        let likes: number = this.currentPost.likes;
        let liked: number = this.currentPost.likedBy?.length;
        raiting = (likes / liked).toFixed(1);
        currentPost.raiting = Number(raiting)
        console.log(raiting);
      } else {
        raiting = 0;
      }

      return raiting

    }










}




