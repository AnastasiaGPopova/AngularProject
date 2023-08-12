import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit{

  constructor(private authService: AuthServiceService, private router: Router){}


  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.router.navigate(['/Home']);
    }
  }

  errors:[] = []


  loginForm  = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    rePassword: new FormControl(""),
    gender: new FormControl("")

  });





  loginSubmit(){
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value

      const res =  this.authService.login(email, password).subscribe((response) => {
        if(response.hasOwnProperty("errors")){
          this.errors = response["message"]
          console.log(this.errors)
          setTimeout(()=> {
            this.errors = []
          },3000)
        console.log(response);
      } else {
        this.router.navigate(['/Home']);
      }
    })
  
}

}
