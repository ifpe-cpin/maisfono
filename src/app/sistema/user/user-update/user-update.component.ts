import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { ROLES } from '../../../models/role';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
  providers:[UserService]
})
export class UserUpdateComponent implements OnInit {

  user:User;
  id;
  roles:string[];
  
  constructor(public db: AngularFirestore,
		private route: ActivatedRoute,
		private router: Router,
		private userService:UserService) { }

  ngOnInit() {

	this.roles = ROLES;
    this.user = new User(this.db);

		this.route
		.queryParams
		.subscribe(params => {
			// Defaults to 0 if no query param provided.
			let id = params['id'];

			if(id!= undefined){
					this.userService.get(id).subscribe(
						user => this.user = user
					);
			}

			
		});
  }


  

  onSubmit() {
		if(this.user.id){
			this.user.update().subscribe(
				result => {
					console.log(this.user)
					this.router.navigate(['/sistema/user/ver'],{ queryParams: { id: this.user.id }});
				});
		}else{
			
			this.user.add().then(
				result => {
					console.log(this.user)
					this.router.navigate(['/sistema/user/ver'],{ queryParams: { id: this.user.id }});
				}
				
			);

		}

	}
	

	updateRoles(event){
		if (event.target.checked) {
			if(this.user.roles.indexOf(event.target.name) < 0){
			    this.user.roles.push(event.target.name);	
			}
		}else{
			if(this.user.roles.indexOf(event.target.name) > -1){
			    this.user.roles.splice(this.user.roles.indexOf(event.target.name),1);
			}
		}
	}

}
