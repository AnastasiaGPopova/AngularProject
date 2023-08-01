import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service.service';
import { Post, dataSearch, Option } from 'src/app/types/api-types';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  allPostsCatalog: Post[] = [];

  constructor(public apiService: ApiService) {}

  searchForm: any = {};
  raiting:any
  _genreOptions: Option[] = [];
  _yearOptions: Option[] = [];
  _gnrSelected!: string;
  _yrSelected!: string;
  data: dataSearch = {
    searchItem: '',
    genres: 'all',
    year: 'all',
  };

  ngOnInit(): void {
    this.apiService.getRecords().subscribe((posts) => {
      // console.log(posts)
      this.allPostsCatalog = posts;
      this.apiService._refreshNeeded$.next(posts);
    });


    for(let item of this.allPostsCatalog){
      let likes = item.likes;
      let liked = item.likedBy?.length;
      this.raiting = (likes / liked).toFixed(2);
      item.raiting = this.raiting.toFixed(2)
      console.log(this.allPostsCatalog);
      console.log(item.raiting);
    }

    this.searchForm = new FormGroup({
      movie: new FormControl(''),
    });

    this.getGenreOptions();
    this.getYearOptions();
  }



  getGenreOptions() {
    this._genreOptions = [
      { id: 0, name: '', isSelected: false },
      { id: 1, name: 'Drama', isSelected: false },
      { id: 2, name: 'Comedy', isSelected: false },
      { id: 3, name: 'Horror', isSelected: false },
      { id: 4, name: 'Documentary', isSelected: false },
      { id: 5, name: 'Action', isSelected: false },
    ];
    this. _gnrSelected = ""
  }

  getYearOptions() {
    this._yearOptions = [
      { id: 0, name: '', isSelected: false },
      { id: 1, name: '1980 and older', isSelected: false },
      { id: 3, name: '1980-2020', isSelected: false },
      { id: 4, name: '2021 and newer', isSelected: false },
    ];
    this._yrSelected=""
  }

  searchClick() {
    if (this._yrSelected != undefined || this._yrSelected != '')
      this.data = {
        searchItem:
          this.searchForm.controls.movie.value != ''
            ? this.searchForm.controls.movie.value
            : 'all',
        year:
          this._yrSelected != undefined && this._yrSelected != ''
            ? this._yrSelected
            : 'all',
        genres:
          this._gnrSelected != undefined && this._gnrSelected != ''
            ? this._gnrSelected
            : 'all',
      };

    console.log(this.data);

    this.apiService.searchFunction(this.data).subscribe((status) => {
      console.log(status);
      this.allPostsCatalog = status;
    });
  }

  resetClick() {
    this.apiService.getRecords().subscribe((posts) => {
      // console.log(posts)
      this.allPostsCatalog = posts;
      this.apiService._refreshNeeded$.next(posts);
    });

    this.getGenreOptions()
    this.getYearOptions()
    this.searchForm.controls.movie.setValue("")


  }

  sortByRaiting() {
    for (let item of this.allPostsCatalog) {
      if (item.likes != null && item.likedBy != null) {
        let raiting = Number(item.likes) / Number(item.likedBy.length);
      }

      this.allPostsCatalog.sort((a: Post, b: Post) => {
        let raitingA: number = 0;
        let raitingB: number = 0;

        if (a.likes != null && a.likedBy != null) {
          raitingA = a.likes / a.likedBy?.length;
          if (Number.isNaN(raitingA)) {
            raitingA = 0;
          }
        }

        if (b.likes != null && b.likedBy != null) {
          raitingB = b.likes / b.likedBy?.length;
          if (Number.isNaN(raitingB)) {
            raitingB = 0;
          }
        }
        return raitingB - raitingA;
      });
    }
  }

  sortByYear(){
    return this.allPostsCatalog.sort((a,b) => {
      return b.year - a.year
    })

  }

  sortRecently(){
    this.apiService.getRecords().subscribe((posts) => {
      // console.log(posts)
      this.allPostsCatalog = posts;
      this.apiService._refreshNeeded$.next(posts);
    });
  }


  sortAlphabetical(){
      return this.allPostsCatalog.sort((a,b) => {
        return  a.movieName > b.movieName ? 1 : -1
    })

  }

}
