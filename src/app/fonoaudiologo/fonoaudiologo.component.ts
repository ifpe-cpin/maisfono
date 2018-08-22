import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';


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

  constructor(public auth: AuthService) { 

  }

  ngOnInit() {
      this.auth.user.subscribe( user =>{
              this.img = user.photoURL;
              this.name = user.displayName;
    })
  }


  public attachSignout() {
      this.auth.signOut();
  }


   openRoom(){
    var new_window = window.open('https://hangouts.google.com/hangouts/_/jyg7ajkibnf6pkmp7fqernkt7ue',"Hangout",'fullscreen=yes');
    
    new_window.onunload = function(){
      console.log("fechou");
    }
   }
}

