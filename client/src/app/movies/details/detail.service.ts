import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service.service';
import { AuthServiceService } from 'src/app/services/authservice.service';
import { Post, Comment } from 'src/app/types/api-types';

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
      raiting: 0
    };
  
    // id: any;
    // raiting: any = 0;
    // voteForm = new FormGroup({
    //   rate: new FormControl(''),
    // });




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
          let raitingNew = (likes / liked).toFixed(2);
          this.currentPost.raiting = Number(raitingNew)
        } else {
          this.currentPost.raiting = 0;
        }
      });
      console.log(res)

      return this.currentPost
    }


    wishFuncService(currentUser:string | null, currentPost: Post, postId:any) {

      currentPost.wishingList?.push(currentUser);
      currentPost = {
        ...currentPost,
        wishingList: currentPost.wishingList,
      };
      let newBody = { ...currentPost };
  
      this.apiService.getWished(postId, newBody).subscribe((update) => {
        this.apiService.isWished$.subscribe();
        this.apiService.refreshNeeded.subscribe();
        console.log(update);
      });
    }




    voteFuncService(currentUser: string | null, currentPost:Post, raitingStar: any, postId:any) {
  
      let oldValue: any = Number(currentPost.likes);
      let newValue = oldValue + Number(raitingStar);
      console.log(newValue)
      currentPost.likedBy?.push(currentUser);
      let newRaiting = newValue / currentPost.likedBy.length
      console.log(newRaiting)
      currentPost = {
        ...currentPost,
        likes: newValue,
        likedBy: currentPost.likedBy,
        raiting: newRaiting
      };
      let newBody = { ...currentPost };
  
      this.apiService.getVoted(postId, newBody).subscribe((update) => {
        this.apiService.refreshNeeded.subscribe();
        this.apiService.isVoted$.subscribe();
      });

      return currentPost
    }


    addANewCommentService(inputText: HTMLTextAreaElement, currenUser:string | null, postId:any, allComments: Comment[]) {
  
      let newComment: Comment = {
        ownerComment: currenUser,
        content: inputText.value,
        recordId: postId,
        createdAt: null,
        updatedAt: null,
        __v: null,
        _id: null,
      };
  
      this.apiService.addComment(newComment).subscribe((status) => {
        console.log(status);
        allComments = [status,...allComments];
        this.apiService._refreshNeeded$.next(status);
      });
  
      inputText.value = '';
      return allComments
    }








}




