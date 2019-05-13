import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PusherService } from '../../services/pusher.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-videocall-icon',
  templateUrl: './videocall-icon.component.html',
  styleUrls: ['./videocall-icon.component.css'],
  providers: [PusherService,UserService]
})
export class VideocallIconComponent implements OnInit {

  @Input()
  userId:string

  visible: boolean


  constructor(private router: Router,
    private pusherService: PusherService,
    private userService:UserService) { }

  ngOnInit() {

    this.userService.read(this.userId).subscribe(
      user =>{
        this.changeVisible(user.status)

        this.pusherService.channel.bind(this.userId, data => {
          this.changeVisible(data.status) 
        });
      }
    )
  }

  videoCall(){
    this.router.navigate(['/sistema/video/play'],{ queryParams: { id: this.userId }});
  }

  private changeVisible(status){
    if(status==1){
      this.visible = true
    }else{
      this.visible = false
    }
  }

}
