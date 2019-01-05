import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Menu } from '../role-menu/menu';
import { MENU } from '../models/menus';

declare const gapi: any;

@Component({
  selector: 'app-home',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css'],
  providers: [AuthService]
})

export class SistemaComponent implements OnInit {
  img: String;
  name: String;

  public auth2: any;

  menus: Menu[];

  constructor(public auth: AuthService) { 

  }

  ngOnInit() {
    this.img = localStorage.getItem('img');
    this.name = localStorage.getItem('name');

  }


  public attachSignout() {
      
    window.location.href = 'https://accounts.google.com/Logout?continue=https%3A%2F%2Fappengine.google.com%2F_ah%2Flogout%3Fcontinue=http%3A%2F%2Flocalhost%3A4200';
      //auth.signOut().then(() => {

  }


   openRoom(){
    var new_window = window.open('https://hangouts.google.com/hangouts/_/jyg7ajkibnf6pkmp7fqernkt7ue',"Hangout",'fullscreen=yes');
    
    new_window.onunload = function(){
      console.log("fechou");
    }
   }
}

