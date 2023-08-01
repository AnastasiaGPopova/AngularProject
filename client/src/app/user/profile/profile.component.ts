import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { Post, User } from 'src/app/types/api-types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user: User = {
    email: '',
    gender: '',
    password: '',
    __v: 0,
    _id: ''
  }

  wishList:Post[] = []
  myRecords:Post[] = []
  currentUser:User={
    email: '',
    gender: '',
    password: '',
    __v: 0,
    _id: ''
  }
  isFemale: boolean = false;

  constructor(public apiService: ApiService){}

  ngOnInit(): void {

    this.apiService.getUser().subscribe(status=>{
      this.user = status
    })

    this.apiService.getMyWishList(`wishList`).subscribe(status=>{
      this.wishList = status
    })

    this.apiService.getMyRecords(`myRecords`).subscribe(status=>{
      this.myRecords = status
      console.log(this.myRecords)
    })

    this.apiService.getUser().subscribe(status => {
      this.currentUser = status
      this.isFemale =this.currentUser.gender === "female"
    })

    


    
  }

}
