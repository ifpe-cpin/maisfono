import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  signOut() {
    //var auth2 = gapi.auth2.getAuthInstance();
    //auth2.signOut().then(function () {
    //  console.log('User signed out.');
    //});
  }

}
