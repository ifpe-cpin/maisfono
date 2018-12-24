import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent implements OnInit{
  title = 'app';


  constructor(private auth: AuthService,  private router: Router){}

  ngOnInit(){
    this.auth.user.subscribe( user =>{
      this.router.navigate(['sistema/dash']);
})
  }
}
