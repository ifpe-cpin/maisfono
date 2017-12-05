import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-calendario-agenda',
  templateUrl: './calendario-agenda.component.html',
  styleUrls: ['./calendario-agenda.component.css']
})
export class CalendarioAgendaComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      $('#calendar').fullCalendar({
        header: {
            left  : 'prev,next today',
            center: 'title',
            right : 'month,agendaWeek,agendaDay'
        },
        events: [
            {
                title: 'Ana Silva',
                start: '2017-09-25T10:00:00',
                end: '2017-9-25T11:00:00'
            },
            {
                title: 'Event2',
                start: '2017-09-05'
            }
          
        ],
        minTime: "08:00:00",
        maxTime: "18:00:00",
        businessHours: [
          {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            dow: [ 1, 2, 3 ], // Monday - Wednesday
            start: '10:00', // a start time (10am in this example)
            end: '18:00', // an end time (6pm in this example)
          },
          {
              // days of week. an array of zero-based day of week integers (0=Sunday)
              dow: [ 4, 5 ], // Thursday - Friday
              start: '13:00', // a start time (10am in this example)
              end: '18:00', // an end time (6pm in this example)
          },

        ]
      });
  }

}
