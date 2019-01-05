import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ROLES } from '../../../models/role';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers:[UserService]
})
export class UserCreateComponent implements OnInit {


  user:User;
  roles:string[];
  
  constructor(private route: ActivatedRoute,
		private router: Router,
		private userService:UserService) { }

    ngOnInit() {

        this.user = new User();

    
        this.route
        .queryParams
        .subscribe(params => {
          console.log(params)
          // Defaults to 0 if no query param provided.
            this.user.id = params['id'];
            this.user.email = params['email'];
            this.user.photoURL =params['photoURL'];
            this.user.displayName = params['displayName']; 
            this.user.roles = ROLES
        });
      }


      onSubmit() {

          this.userService.create(this.user).subscribe(
            result => {
              console.log(this.user)
              this.router.navigate(['/sistema/dash']);
            }
            );
    
      }
    

}
