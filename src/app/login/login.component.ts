import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  
  constructor(public auth: AuthService, private router: Router){ 

  }

  login(){
    this.auth.googleLogin().then(
      () => {
        console.log("Login")
        this.router.navigate(['/sistema/dash'])
      } 
    ).catch(error =>{
        console.log(error)
      } )
  }
  

  ngOnInit() {
    
  }


}
