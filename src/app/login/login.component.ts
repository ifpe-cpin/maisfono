import { Component, OnInit, Inject } from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  imageURL: string;
  email: string;
  name: string;
  token: string;
  
  
  constructor(private router: Router) { }

  ngOnInit() {
    
  }

 

  /**
   * Getting data from browser's local storage
   */
  getData() {
    this.token = localStorage.getItem('token');
    this.imageURL = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }

  login(googleUser){
    console.log("Passou");
    if(googleUser!=null){
      var profile = googleUser.getBasicProfile();
      
      localStorage.setItem('id', profile.getId());
      localStorage.setItem('image', profile.getImageUrl());
      localStorage.setItem('name', profile.getName());
      localStorage.setItem('email', profile.getEmail());

      this.router.navigate(['/home/dash']);
    }
  }

  /**
   * Logout user and calls function to clear the localstorage
   */
  logout() {
    
  }

  /**
   * Clearing Localstorage of browser
   */
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

}
