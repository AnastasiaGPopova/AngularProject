import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service.service';
import { Post } from 'src/app/types/api-types';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute,){}

  _genreList: any[] = []
  allGenres: any[] = []

  creationForm!: FormGroup;
  sub:any
  id:any
  errors: any =""

  currentPost: Post = {
    movieName: "",
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
    updatedAt: null
  }


  ngOnInit(): void {

  this.creationForm  = new FormGroup({
    movie: new FormControl(""),
    cast: new FormControl(""),
    director: new FormControl(""),
    year: new FormControl(""),
    imageUrl: new FormControl(""),
    description: new FormControl("")
  })
   



    this.sub = this.route.params.subscribe((params) => {
      this.id = params['recordId'];
      console.log(this.id);
    });

    this.apiService.getItemById(this.id).subscribe((post) => {
      this.currentPost = post

      this.getGenres(this.currentPost.genre)

      this.creationForm.setValue({
        movie:  this.currentPost.movieName,
        cast: this.currentPost.artist,
        director: this.currentPost.director,
        year: this.currentPost.year,
        imageUrl: this.currentPost.imageUrl,
        description: this.currentPost.description,
     })

     })  
}


getGenres(options:any | null){

  console.log(options)


  {
    this._genreList=[
      {id:1, name: "Drama", isSelected: options.includes("Drama")},
      {id:2, name: "Comedy", isSelected: options.includes("Comedy")},
      {id:3, name: "Horror", isSelected: options.includes("Horror")},
      {id:4, name: "Documentary", isSelected: options.includes("Documentary")},
      {id:5, name: "Action", isSelected: options.includes("Action")}
    ]
  }
}


onchange(){
  console.log(this._genreList)
  let selectedGenres = this._genreList.filter(x => x.isSelected==true)
  for (const element of selectedGenres ){
    if(!this.allGenres.includes(element.name)){
      this.allGenres.push(element.name)
      console.log(this.allGenres)
    }


  }
}



  editSubmit(){

   if(this.allGenres.length == 0){
    let selectedGenres = this._genreList.filter(x => x.isSelected==true)
    for (const element of selectedGenres ){
      if(!this.allGenres.includes(element.name)){
        this.allGenres.push(element.name)
        console.log(this.allGenres)
      }

     } 
    }


    const body:Post= {
      movieName: this.creationForm.controls["movie"].value,
      artist: this.creationForm.controls["cast"].value,
      director: this.creationForm.controls["director"].value,
      year: Number(this.creationForm.controls["year"].value),
      imageUrl: this.creationForm.controls["imageUrl"].value,
      description: this.creationForm.controls["description"].value,
      likes: this.currentPost.likes,
      likedBy: this.currentPost.likedBy,
      wishingList: this.currentPost.wishingList,
      genre: this.allGenres.join(", "),
      createdAt: null,
      updatedAt: null
    };
    console.log(`--------AllFields---------`)
    console.log(body.movieName)
    console.log(body.artist)
    console.log(body.director)
    console.log(body.year)
    console.log(body.imageUrl)
    console.log(body.description)
    console.log(body.genre)


        const res = this.apiService.editRecord(this.id, body).subscribe((response) =>{
          if(response.hasOwnProperty("errors")){
            this.errors = response["message"]
            console.log(this.errors)
            setTimeout(()=> {
              this.errors = ""
            },3000)
          console.log(response);
        } else {
          this.router.navigate([`/movies/${this.currentPost._id}`])
        }
      })


  }
}
