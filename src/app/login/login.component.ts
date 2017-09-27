import { Component, OnInit, Inject, AfterViewInit} from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';
import {Router} from "@angular/router";

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit,AfterViewInit {
  public img: String;
  public name: String;
  
  public auth2: any;
  
  
  constructor(private router: Router,private _googleAuth: AuthService) { }

  ngOnInit() {
    AppGlobals.GOOGLE_CLIENT_ID = '1062172680352-69ua0kcurpstpb26d0inl1ag6kv1lpir.apps.googleusercontent.com';

    
  }

 
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: AppGlobals.GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();

        localStorage.setItem('token', googleUser.getAuthResponse().id_token);
        localStorage.setItem('img', profile.getImageUrl());
        localStorage.setItem('name', profile.getName());
        localStorage.setItem('email', profile.getEmail());
       
    this.img = localStorage.getItem("img");
    this.name = localStorage.getItem("name");

        this.router.navigate(['/home/dash']);

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

 

  ngAfterViewInit(){
    this.googleInit();
}


}
