import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { MainModule } from './main/main.module';
import { AuthTokenProvider } from './services/token-interceptor.service';
import { MoviesModule } from './movies/movies.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    UserModule,
    MainModule,
    SharedModule,
    MoviesModule,
    AppRoutingModule
  ],
  providers: [AuthTokenProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
