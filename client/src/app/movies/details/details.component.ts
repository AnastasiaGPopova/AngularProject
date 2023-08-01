import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service.service';
import { AuthServiceService } from 'src/app/services/authservice.service';
import { Post, Comment } from 'src/app/types/api-types';
import { DetailService } from './detail.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnChanges {
  constructor(
    public apiService: ApiService,
    private route: ActivatedRoute,
    public authService: AuthServiceService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private detailService: DetailService
  ) {}

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
  allComments: Comment[] = [];
  currenUser = localStorage.getItem("userId")

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['recordId'];
      console.log(this.id);
    });

    this.apiService.getAllCommentsForRecord(this.id).subscribe((comments) => {
      this.allComments = comments;
      console.log(comments);
      this.apiService._refreshNeeded$.next(comments);
    });

     
      // this.currentPost = this.detailService.getCurrent(this.id)
      // console.log(this.currentPost)
      // this.cd.detectChanges()





    this.apiService.getItemById(this.id).subscribe((post) => {
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes from details' + '' + changes);
  }

  wishFunc() {
    let currentUser: string | null= localStorage.getItem('userId');
    this.detailService.wishFuncService(currentUser, this.currentPost, this.id)


    // let currentUser: string | null = localStorage.getItem('userId');
    // this.currentPost.wishingList?.push(currentUser);
    // this.currentPost = {
    //   ...this.currentPost,
    //   wishingList: this.currentPost.wishingList,
    // };
    // let newBody = { ...this.currentPost };

    // this.apiService.getWished(this.id, newBody).subscribe((update) => {
    //   this.apiService.isWished$.subscribe();
    //   this.apiService.refreshNeeded.subscribe();
    //   this.cd.detectChanges();
    //   console.log(update);
    // });
  }

  voteFunc() {
    let currentUser: string | null = localStorage.getItem('userId');
    
    let raitingStar = this.voteForm.controls.rate.value;

    if (raitingStar == '') {
      window.alert('Chose your star!');
      return;
    }

    console.log(raitingStar);
      this.currentPost = this.detailService.voteFuncService(currentUser, this.currentPost, raitingStar, this.id)
     

    // let oldValue: any = Number(this.currentPost.likes);
    // let newValue = oldValue + Number(raitingStar);
    // console.log(newValue)
    // this.currentPost.likedBy?.push(currentUser);
    // let newRaiting = newValue / this.currentPost.likedBy.length
    // console.log(newRaiting)
    // this.currentPost = {
    //   ...this.currentPost,
    //   likes: newValue,
    //   likedBy: this.currentPost.likedBy,
    //   raiting: newRaiting
    // };
    // let newBody = { ...this.currentPost };

    // this.apiService.getVoted(this.id, newBody).subscribe((update) => {
    //   this.apiService.refreshNeeded.subscribe();
    //   this.apiService.isVoted$.subscribe();
    //   this.cd.detectChanges()
    //   this.ngOnInit();
    // });
  }

  addANewComment(inputText: HTMLTextAreaElement) {
    let currentUser: string | null = localStorage.getItem('email');
    if (inputText.value == '') {
      window.alert('Write your comment first!');
      return;
    }

    // this.allComments = this.detailService.addANewCommentService(inputText, currentUser, this.id, this.allComments)


    let newComment: Comment = {
      ownerComment: currentUser,
      content: inputText.value,
      recordId: this.id,
      createdAt: null,
      updatedAt: null,
      __v: null,
      _id: null,
    };

    this.apiService.addComment(newComment).subscribe((status) => {
      console.log(status);

      this.allComments = [status,...this.allComments];
      this.cd.detectChanges();
      this.apiService._refreshNeeded$.next(status);
    });

    inputText.value = '';
  }

  onDeleteClick() {
    const choise = window.confirm('Are you sure you want to delete this item?');
    if (choise) {
      this.apiService.deleteRecord(this.id).subscribe((post) => {
        console.log(post);
        this.apiService.refreshNeeded.subscribe();
        this.router.navigate(['/Catalog']);
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
