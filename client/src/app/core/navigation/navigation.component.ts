import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authservice.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  constructor(public authService: AuthServiceService, public cdTest: ChangeDetectorRef,
    private router: Router,){}



  ngOnInit() {

   this.authService.isLoggedIn$.subscribe(status => {
    console.log(status)
   })


    };

  
  

  logoutClick(){
    this.authService.logout()
    this.cdTest.detectChanges()
    this.router.navigate(['/Home']);

  }
  title = 'project-2';
}