import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apiServices/api.service';
import { Observable } from 'rxjs';
import { Post, iMDB } from 'src/types/api-types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit{
  allPosts: Post[] = []
  allIMDB: any[] = []
  allMovies: any[] = []

  constructor(public apiService: ApiService){
 
  }


  ngOnInit(): void {
    this.apiService.getRecords().subscribe(posts => {
      // console.log(posts)
      this.apiService._refreshNeeded$.next(posts)
      this.allPosts = posts.slice(0,4)
      console.log(this.allPosts)

      this.allPosts.map(x => {
        this.allMovies.push(x.movieName)
      })

      // for(let item of this.allMovies){
      //   this.apiService.imdbSearch(item).subscribe(status=>{
      //     console.log(status["d"][0])
      
      //     let newMovie = {
      //       movie: item,
      //       imageUrl: status["d"][0].i.imageUrl,
      //       year: status["d"][0].y,
      //       link: `https://www.imdb.com/title/${status["d"][0].id}/?ref_=fn_al_tt_1`,
      //       stars: status["d"][0].s
      //     }
      //     this.allIMDB.push(newMovie)
      //   })

      // }
    })


    
    
  }

}
