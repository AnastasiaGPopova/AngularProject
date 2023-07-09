import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { ImdbComponent } from './imdb/imdb.component';
import { MovieComponent } from './movie/movie.component';



@NgModule({
  declarations: [
    ErrorComponent,
    ImdbComponent,
    MovieComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ErrorComponent, ImdbComponent, MovieComponent]
})
export class SharedModule { }
