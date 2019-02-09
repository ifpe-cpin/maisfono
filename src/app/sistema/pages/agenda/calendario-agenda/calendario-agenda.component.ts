import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { Calendario } from '../../../../models/calendario';
import { CalendarioService } from '../../../../services/calendario.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-calendario-agenda',
  templateUrl: './calendario-agenda.component.html',
  styleUrls: ['./calendario-agenda.component.css'],
  providers: [CalendarioService]

})

export class CalendarioAgendaComponent implements OnInit {
    
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
   
    constructor(private calendarioService:CalendarioService,
                private route: ActivatedRoute,
                private router: Router) { }

    calendarOptions: Options;
    events;
    loading:boolean;

    ngOnInit() {
        this.loading = true;
        this.refreshData();
        

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

    refreshData(){
        this.route
		.queryParams
		.subscribe(params => {
			// Defaults to 0 if no query param provided.
            let id = localStorage.getItem('fonoId');
            
			if(id!= undefined){
                this.calendarioService.listWithID(id).subscribe(
                    events => {
                        this.events = events
                    }
                );
            } 
        });
       
    }


}
