import { Component, Input, OnInit } from '@angular/core';
import { iMDB } from 'src/app/types/api-types';

@Component({
  selector: 'app-imdb',
  templateUrl: './imdb.component.html',
  styleUrls: ['./imdb.component.css']
})
export class ImdbComponent implements OnInit{
  @Input() movies: iMDB[] = []

  ngOnInit(): void {
    console.log(this.movies)
  }

}
