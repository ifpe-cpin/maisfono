import { OnInit, Component,AfterViewInit } from '@angular/core';


declare const gapi: any;

@Component({
    selector:'app-video',
    templateUrl:'./video.component.html',
    styleUrls:['./video.component.css']
})
export class VideoComponent implements OnInit,AfterViewInit{
    ngOnInit(){

    }

    googleInit(){
        gapi.hangout.render('placeholder-rr', {
            'render': 'createhangout',
            'initial_apps': [{'app_id' : '184219133185', 'start_data' : 'dQw4w9WgXcQ', 'app_type' : 'ROOM_APP' }],
            'widget_size': 175,
            'invites':"[{ id:'juniorpiresupe@gmail.com',invite_type:'EMAIL'}]"
          });
    }

    
    ngAfterViewInit(){
        this.googleInit();
    }
}