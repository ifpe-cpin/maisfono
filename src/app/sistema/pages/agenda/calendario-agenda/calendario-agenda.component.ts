import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-calendario-agenda',
  templateUrl: './calendario-agenda.component.html',
  styleUrls: ['./calendario-agenda.component.css']
})

export class CalendarioAgendaComponent implements OnInit {
    calendarOptions:Options;
    events: any[];
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    constructor(private http: HttpClient, private route: ActivatedRoute) { }

    ngOnInit() {
        this.getEventsCalendarRest().subscribe(data => {
            this.events = <any>data
        })
        

        this.calendarOptions = {
            locale: 'pt-br',
            editable: true,
            eventLimit: false,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            events: this.events
          };
    }
    
    getEventsCalendarRest(){    
        let idFonoaudiologo = 2;//this.route.snapshot.paramMap.get('id');
        //passando como parametro o id do paciente e o id do fono
        return this.http.get('http://localhost/slim/public/fonoaudiologo/calendario/'+idFonoaudiologo)
    }
}
