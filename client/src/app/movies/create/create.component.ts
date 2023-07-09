import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service.service';
import { Genre, Post } from 'src/app/types/api-types';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  _genreList: Genre[] = [];
  allGenres: any[] = [];
  errors: any =""

  creationForm = new FormGroup({
    movie: new FormControl(''),
    cast: new FormControl(''),
    director: new FormControl(''),
    year: new FormControl(''),
    imageUrl: new FormControl(''),
    description: new FormControl(''),
    genre: new FormControl(''),
  });

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    {
      this._genreList = [
        { id: 1, name: 'Drama', isSelected: false },
        { id: 2, name: 'Comedy', isSelected: false },
        { id: 3, name: 'Horror', isSelected: false },
        { id: 4, name: 'Documentary', isSelected: false },
        { id: 5, name: 'Action', isSelected: false },
      ];
    }
  }

  onchange() {
    console.log(this._genreList);
    let selectedGenres = this._genreList.filter((x) => x.isSelected == true);
    for (const element of selectedGenres) {
      if (!this.allGenres.includes(element.name)) {
        this.allGenres.push(element.name);
        console.log(this.allGenres);
      }
    }
  }

  creationSubmit() {
    const body: Post = {
      movieName:
        this.creationForm.controls.movie.value != null
          ? this.creationForm.controls.movie.value
          : '',
      artist: this.creationForm.controls.cast.value,
      director: this.creationForm.controls.director.value,
      year: Number(this.creationForm.controls.year.value),
      imageUrl: this.creationForm.controls.imageUrl.value,
      description: this.creationForm.controls.description.value,
      genre: this.allGenres.join(', '),
      likes: 0,
      likedBy: [],
      wishingList: null,
      createdAt: null,
      updatedAt: null,
    };

    const res = this.apiService.createRecord(body).subscribe((response) => {
      if(response.hasOwnProperty("errors")){
        this.errors = response["message"]
        console.log(this.errors)
        setTimeout(()=> {
          this.errors = ""
        },3000)
      console.log(response);
    } else {
      this.router.navigate(['/Catalog']);
    }
  })

  }
}
