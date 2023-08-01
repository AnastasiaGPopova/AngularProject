import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/types/api-types';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{
  @Input() postssss: Post[] = []
  // @Input() wishes:Post[] = []

  ngOnInit(): void {
    console.log(this.postssss)
  }


}
