import { Component, OnInit, Input } from '@angular/core';
import { Menu, CUSTOM } from './menu';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.css'],
  providers: [AuthService]
})
export class RoleMenuComponent implements OnInit {

  @Input()
  menus: Menu[];

  selectMenus: Menu[]=[];

  roles: String[];


  constructor(private auth: AuthService) { }

  ngOnInit() {
    let roles = localStorage.getItem('roles');
    this.roles = roles.split(",")

    this.selectMenus=[];
    this.menus.forEach(element => {
      if(this.roles.includes(element.role) || element.role == CUSTOM ){
          this.selectMenus.push(element);
      }
    });


    // this.auth.user.subscribe(
    //   user=> {
    //     this.selectMenus=[];
    //     this.roles = user.roles
      
    //     this.menus.forEach(element => {
    //       if(this.roles.includes(element.role) || element.role == CUSTOM ){
    //           this.selectMenus.push(element);
    //       }
    //     });
    //   } 
    // );
  }

}
