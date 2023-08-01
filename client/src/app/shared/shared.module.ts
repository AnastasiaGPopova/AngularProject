import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { ImdbComponent } from './imdb/imdb.component';
import { MovieComponent } from './movie/movie.component';
import { NoEntriesComponent } from './no-entries/no-entries.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    ErrorComponent,
    ImdbComponent,
    MovieComponent,
    NoEntriesComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ErrorComponent, ImdbComponent, MovieComponent, NoEntriesComponent, NotFoundComponent]
})
export class SharedModule { }
