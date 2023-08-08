import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { HomeComponent } from './main/home/home.component';
import { CatalogComponent } from './main/catalog/catalog.component';
import { CreateComponent } from './movies/create/create.component';
import { DetailsComponent } from './movies/details/details.component';
import { EditComponent } from './movies/edit/edit.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';


const appRoute: Routes = [

  {path: '', component: HomeComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'Catalog', component: CatalogComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Add-review', component: CreateComponent, canActivate: [IsAuthenticatedGuard]},
  {path: 'movies/:recordId', component: DetailsComponent},
  {path: 'edit/:recordId', component: EditComponent, canActivate: [IsAuthenticatedGuard]},
  {path: 'MyProfile', component: ProfileComponent, canActivate: [IsAuthenticatedGuard]},
  {path: '**', component: NotFoundComponent},

]


@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
