import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms"
import { AuthServiceService } from '../services/authService/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthServiceService, private router: Router){}


  registrationForm  = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    rePassword: new FormControl(""),
    gender: new FormControl("")

  });





  registerSubmit(){

    let email = this.registrationForm.controls.email.value;
    let password = this.registrationForm.controls.password.value
    let rePassword = this.registrationForm.controls.rePassword.value
    let gender = this.registrationForm.controls.gender.value

    console.log(email)

    if(email != null && password !=null && rePassword != null && gender !=null){
      const res=  this.authService.register(email, password, rePassword, gender).subscribe((response) => {
        console.log(response);
        this.router.navigate(["/Home"])
      });
      console.log(res)
    }


  }


}
