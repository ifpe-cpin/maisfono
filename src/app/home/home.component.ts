import { Component, OnInit } from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';


declare const gapi: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})

export class HomeComponent implements OnInit {
  img: String;
  name: String;

  public auth2: any;

  constructor(private _googleAuth: AuthService) { }

  ngOnInit() {
    AppGlobals.GOOGLE_CLIENT_ID = '1062172680352-69ua0kcurpstpb26d0inl1ag6kv1lpir.apps.googleusercontent.com';
    
    this.img = localStorage.getItem("img");
    this.name = localStorage.getItem("name");
  }


  public attachSignout() {
        this._googleAuth.userLogout(()=>{
          console.log("logout");
        });
  }
}

