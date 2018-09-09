import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
  providers:[UserService]
})
export class UserUpdateComponent implements OnInit {

  user:User;
  id;
  
  constructor(public db: AngularFirestore,
		private route: ActivatedRoute,
		private router: Router,
		private userService:UserService) { }

  ngOnInit() {

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
					console.log(result)
					this.router.navigate(['/fonoaudiologo/user/ver'],{ queryParams: { id: this.user.id }});
				});
		}else{
			
			this.user.add().then(
				result => {
					console.log(result)
					this.router.navigate(['/fonoaudiologo/user/ver'],{ queryParams: { id: this.user.id }});
				}
				
			);

		}

    }

}
