import { OnInit, Component,AfterViewInit, Input,OnChanges,SimpleChanges } from '@angular/core';

import { Paciente } from "../../../models/paciente";


declare const gapi: any;

@Component({
    selector:'app-video',
    templateUrl:'./video.component.html',
    styleUrls:['./video.component.css']
})
export class VideoComponent implements OnInit,AfterViewInit,OnChanges{

    @Input() paciente: Paciente;

    constructor(){
        
    }
        
    ngOnInit(){
    }

    googleInit(){
        gapi.hangout.render('placeholder-rr', {
            'render': 'createhangout',
            'initial_apps': [{'app_id' : '184219133185', 'start_data' : 'dQw4w9WgXcQ', 'app_type' : 'ROOM_APP' }],
            'widget_size': 175,
            'invites':"[{ id:'"+this.paciente.dsc_email+"',invite_type:'EMAIL'}]"
          });
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.paciente.currentValue!=undefined){
            this.googleInit();
        }
      }
    
    ngAfterViewInit(){
        //this.googleInit();
    }
}