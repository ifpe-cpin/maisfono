import { Component, OnInit, Inject } from '@angular/core';
import { Menu } from '../role-menu/menu';
import { MENU } from '../models/menus';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ResourceServiceInterface } from '../services/resource.service.interface';

declare const gapi: any;

@Component({
  selector: 'app-home',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css'],
  providers: [{provide: 'ResourceServiceInterface', useClass: UserService}]
})

export class SistemaComponent implements OnInit {
  
  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  
  img: String;
  name: String;
  id: String;
  visible: String;

  public auth2: any;

  menus: Menu[];

  constructor(private route: ActivatedRoute, private router: Router,
    @Inject('ResourceServiceInterface') private userService:ResourceServiceInterface<User>) { 

  }

  ngOnInit() {

    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
    
    this.img = localStorage.getItem('img');
    this.name = localStorage.getItem('name');
    this.id = localStorage.getItem('id');

    this.menus = MENU;


    this.showVideoChatButton();
   

  }


  private showVideoChatButton() {
    this.userService.read(this.id).subscribe(user => {
      if (user.isFonoaudiologo()) {
        this.visible = "visible";
      }
      else {
        this.visible = "hidden";
      }
    });
  }

  public attachSignout() {
      
    localStorage.setItem('id',"");
    localStorage.setItem('email',"");
    localStorage.setItem('img',"");
    localStorage.setItem('name',"");
    localStorage.setItem('roles',"");

    window.location.href = 'https://accounts.google.com/Logout?continue=https%3A%2F%2Fappengine.google.com%2F_ah%2Flogout%3Fcontinue=http%3A%2F%2Flocalhost%3A4200';

  }


   openRoom(){
    this.router.navigate(['/sistema/video/play'],{ queryParams: { id: this.id }});
   }
}

