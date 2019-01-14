import { Component, OnInit, Input, InjectionToken } from '@angular/core';
import { Menu } from '../../role-menu/menu';
import { MENU } from '../../models/menus';

declare const gapi: any;

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css']
})
export class LeftSideComponent implements OnInit {
  img: String;
  name: String;
  menus: Menu[];
  public auth2: any;

  constructor() { }

  ngOnInit() {
  }

}
