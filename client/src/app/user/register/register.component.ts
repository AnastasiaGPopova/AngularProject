import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthServiceService, private router: Router){}

  errors:[] = []


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

   
      const res=  this.authService.register(email, password, rePassword, gender).subscribe((response) => {
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
