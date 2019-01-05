import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
  providers:[UserService]
})
export class UserViewComponent implements OnInit {

  user: User;
  loading:boolean;

  constructor(private route: ActivatedRoute,
    private userService:UserService) { }

    ngOnInit() {
      this.loading = true;
      this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        let id = params['id'];
  
        if(id!= undefined){
            this.userService.read(id).subscribe(
              user => {
                this.user = user
                this.loading = false;
              }
            );
        }
  
        
      });
    }
  

}
