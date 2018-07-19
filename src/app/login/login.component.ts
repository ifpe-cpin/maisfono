import { Component, OnInit, Inject, AfterViewInit} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService, GoogleLoginProvider} from 'angular5-social-auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  
  constructor(private socialAuthService: AuthService, private router: Router){ 

  }

  public socialSignIn(socialPlatform : string, $scope) {
    var img;
    var name;

    //var app = angular.module('img', []);
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID; 
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
          
            localStorage.setItem('img', userData.image);
            localStorage.setItem('name', userData.name);
          
            
        // Now sign-in with userData
        this.router.navigate(['/fonoaudiologo/dash']);
                                            
                                     
            
      }
    );
  }

  ngOnInit() {
    
  }


}
