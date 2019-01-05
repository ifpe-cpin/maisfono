import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FONOAUDIOLOGO, PACIENTE } from '../../../models/tipoUsuario';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers:[UserService]
})
export class UserCreateComponent implements OnInit {


  user:User;
  roles:string[];
  tipos:number[];
  
  constructor(private route: ActivatedRoute,
		private router: Router,
		private userService:UserService) { }

    ngOnInit() {

        this.user = new User();
        this.tipos = [FONOAUDIOLOGO,PACIENTE]

    
        this.route
        .queryParams
        .subscribe(params => {
          console.log(params)
          // Defaults to 0 if no query param provided.
            this.user.id = params['id'];
            this.user.email = params['email'];
            this.user.photoUrl =params['photoUrl'];
            this.user.displayName = params['displayName']; 

            
            
        });
      }


      onSubmit() {
          
          if(this.user.tipo==FONOAUDIOLOGO){
            this.user.roles = ["admin","fono"]
          }else if(this.user.tipo==PACIENTE){
            this.user.roles = ["admin","paciente"]
          }

          this.userService.create(this.user).subscribe(
            result => {
              console.log(this.user)
              
              localStorage.setItem('roles', this.user.roles.toString());
              this.router.navigate(['/sistema/dash']);
            }
            );
    
      }
    

}
