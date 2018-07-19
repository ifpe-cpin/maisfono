import { Component, OnInit } from '@angular/core';


declare const gapi: any;

@Component({
  selector: 'app-home',
  templateUrl: './fonoaudiologo.component.html',
  styleUrls: ['./fonoaudiologo.component.css']
})

export class FonoaudiologoComponent implements OnInit {
  img: String;
  name: String;

  public auth2: any;

  constructor() { 

  }

  ngOnInit() {
    this.img = localStorage.getItem('img');
    this.name = localStorage.getItem('name');
  }


  public attachSignout() {
      
  }


   openRoom(){
    var new_window = window.open('https://hangouts.google.com/hangouts/_/jyg7ajkibnf6pkmp7fqernkt7ue',"Hangout",'fullscreen=yes');
    
    new_window.onunload = function(){
      console.log("fechou");
    }
   }
}

