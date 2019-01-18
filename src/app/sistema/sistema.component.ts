import { Component, OnInit } from '@angular/core';
import { Menu } from '../role-menu/menu';
import { MENU } from '../models/menus';
import { ActivatedRoute, Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-home',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css'],
  providers: []
})

export class SistemaComponent implements OnInit {
  
  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  
  img: String;
  name: String;
  id: String;

  public auth2: any;

  menus: Menu[];

  constructor(private route: ActivatedRoute, private router: Router,) { 

  }

  ngOnInit() {

    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
    
    this.img = localStorage.getItem('img');
    this.name = localStorage.getItem('name');
    this.id = localStorage.getItem('id');

    this.menus = MENU;

  }


  public attachSignout() {
      
    localStorage.setItem('id',"");
    localStorage.setItem('email',"");
    localStorage.setItem('img',"");
    localStorage.setItem('name',"");
    localStorage.setItem('roles',"");

    window.location.href = 'https://accounts.google.com/Logout?continue=https%3A%2F%2Fappengine.google.com%2F_ah%2Flogout%3Fcontinue=http%3A%2F%2Flocalhost%3A4200';
      //auth.signOut().then(() => {

  }


   openRoom(){
     console.log("user-id: "+this.id)
    this.router.navigate(['/sistema/video/play'],{ queryParams: { id: this.id }});
   }
}

