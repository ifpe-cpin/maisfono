import { Component, OnInit, Input, InjectionToken, Inject } from '@angular/core';
import { Menu } from '../../role-menu/menu';
import { MENU } from '../../models/menus';
import { PusherService } from '../../services/pusher.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceServiceInterface } from '../../services/resource.service.interface';
import { User } from '../../models/user';

declare const gapi: any;

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css'],
  providers: [{provide: 'ResourceServiceInterface', useClass: UserService},PusherService]
})
export class LeftSideComponent implements OnInit {
  img: String;
  name: String;
  menus: Menu[];
  id: String;
  public auth2: any;
  visible: String;

  constructor(private route: ActivatedRoute, private router: Router,
    @Inject('ResourceServiceInterface') private userService:ResourceServiceInterface<User>,
    private pusherService: PusherService) { }

  ngOnInit() {
    
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

  openRoom(){
    this.router.navigate(['/sistema/video/play'],{ queryParams: { id: this.id }});
   }

}
