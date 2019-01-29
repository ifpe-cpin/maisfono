import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserStatus } from '../../models/user-status';
import { STATUS } from '../../models/status';
import { PusherService } from '../../services/pusher.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css'],
  providers: [PusherService,UserService]
})
export class UserStatusComponent implements OnInit,OnChanges {

  @Input()
  nameVisible:boolean = false

  userStatus: UserStatus
  status:number

  @Input()
  userId: string

  constructor(private pusherService: PusherService,private userService:UserService) { }

  ngOnChanges(){
    //this.userId = localStorage.getItem("id")
  }

  ngOnInit() {

    this.userStatus = STATUS[0]


    this.userService.read(this.userId).subscribe(
      user =>{
        this.userStatus = STATUS[user.status]

        this.pusherService.channel.bind(this.userId, data => {
          this.status = data.status
          this.userStatus = STATUS[this.status]
        });
      }
    )
    
    

    
    
  }



}
