import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  img: String;
  name: String;
  constructor() { }

  ngOnInit() {
    
    this.img = localStorage.getItem("img");
    this.name = localStorage.getItem("name");
  }

}

