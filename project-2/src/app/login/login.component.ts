import { ChangeDetectorRef, Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms"
import { AuthServiceService } from '../services/authService/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthServiceService, private router: Router){}


  loginForm  = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    rePassword: new FormControl(""),
    gender: new FormControl("")

  });





  loginSubmit(){
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value

    console.log(email)

    if(email != null && password){
      const res=  this.authService.login(email, password).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/Home'])
      });
      console.log(res)
    }


  }


}
