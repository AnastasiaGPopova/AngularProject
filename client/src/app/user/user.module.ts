import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  
  ],
  imports: [
    CommonModule, SharedModule,
    FormsModule,
    ReactiveFormsModule

  ], exports: [ 
    LoginComponent,
    RegisterComponent,
    ProfileComponent]
})
export class UserModule { }
