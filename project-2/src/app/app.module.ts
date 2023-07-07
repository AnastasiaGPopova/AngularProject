import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { AuthTokenProvider } from './services/tokenInterceptor/token-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RecordComponent } from './record/record.component';
import { ImdbTableComponent } from './imdb-table/imdb-table.component';
import { CatalogComponent } from './catalog/catalog.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { CommentComponent } from './comment/comment.component';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorBoxComponent } from './error-box/error-box.component';



const appRoute: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'Home', component: HomePageComponent},
  {path: 'Catalog', component: CatalogComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Add-review', component: CreateComponent},
  {path: 'movies/:recordId', component: DetailsComponent},
  {path: 'edit/:recordId', component: EditComponent},
  {path: 'MyProfile', component: ProfileComponent},

]


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RecordComponent,
    ImdbTableComponent,
    CatalogComponent,
    RegisterComponent,
    LoginComponent,
    NavigationComponent,
    CreateComponent,
    DetailsComponent,
    CommentComponent,
    EditComponent,
    ProfileComponent,
    ErrorBoxComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthTokenProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
