import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, GoogleLoginProvider} from 'angular5-social-auth';
import { UserService } from '../services/user.service';
import { ResourceServiceInterface } from '../services/resource.service.interface';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService,{provide: 'ResourceServiceInterface', useClass: UserService}]
})
export class LoginComponent implements OnInit, OnDestroy{
  
  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  user:User;

  constructor(@Inject('ResourceServiceInterface') 
              private userService:ResourceServiceInterface<User>,
  private socialAuthService: AuthService, private router: Router){ 

  }

  public socialSignIn(socialPlatform : string, $scope) {
  
 
    //var app = angular.module('img', []);
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID; 
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
            this.user = new User();

            this.user.id = userData.id
            this.user.email = userData.email
            this.user.photoUrl = userData.image
            this.user.displayName = userData.name

            localStorage.setItem('id', this.user.id);
            localStorage.setItem('email', this.user.email);
            localStorage.setItem('img', this.user.photoUrl);
            localStorage.setItem('name', this.user.displayName);
            

        this.userService.read(userData.id).subscribe(
          user => {
              if(user.id!=undefined){
                console.log(user)
                localStorage.setItem('roles', user.roles.toString());
                this.router.navigate(['/sistema/dash'],);
              }else{
                console.log({queryParams:this.user})
                this.router.navigate(['user-create'],{queryParams:this.user});
              }
          }
        );
        



      }
    );
  }
  

  ngOnInit() {
    // add the the body classes
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
    
  }

   ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-blue');
    this.body.classList.remove('sidebar-mini');
  }


}
