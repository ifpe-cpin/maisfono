import { Component, OnInit } from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';


declare const gapi: any;

@Component({
  selector: 'app-home',
  templateUrl: './fonoaudiologo.component.html',
  styleUrls: ['./fonoaudiologo.component.css'],
  providers: [AuthService]
})

export class FonoaudiologoComponent implements OnInit {
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
          localStorage.clear();
        });
  }


   openRoom(){
    var new_window = window.open('https://hangouts.google.com/hangouts/_/jyg7ajkibnf6pkmp7fqernkt7ue',"Hangout",'fullscreen=yes');
    
    new_window.onunload = function(){
      console.log("fechou");
    }
   }
}

