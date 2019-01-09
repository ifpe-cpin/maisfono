import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from 'ng-fullcalendar';

import { AgendaRoutingModule } from './agenda.routing.module';
import { CalendarioAgendaComponent } from './calendario-agenda/calendario-agenda.component';
import { ConsultaAgendaComponent } from './consulta-agenda/consulta-agenda.component';
import { AgendaComponent } from './agenda.component';

@NgModule({ 
  imports: [
    CommonModule,
    AgendaRoutingModule,
    FullCalendarModule
  ],
  declarations: [
    CalendarioAgendaComponent, 
    ConsultaAgendaComponent, 
    AgendaComponent
  ]
})
export class AgendaModule { }
