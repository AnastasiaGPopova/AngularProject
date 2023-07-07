import { Component, Input, OnInit } from '@angular/core';
import { iMDB, imdbD } from 'src/types/api-types';

@Component({
  selector: 'app-imdb-table',
  templateUrl: './imdb-table.component.html',
  styleUrls: ['./imdb-table.component.css']
})
export class ImdbTableComponent implements OnInit{
  @Input() movies: iMDB[] = []

  ngOnInit(): void {
    console.log(this.movies)
  }


}

