import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from 'ng-fullcalendar';

import { AgendaRoutingModule } from './agenda.routing.module';
import { CalendarioAgendaComponent } from './calendario-agenda/calendario-agenda.component';
import { ConsultaAgendaComponent } from './consulta-agenda/consulta-agenda.component';
import { AgendaComponent } from './agenda.component';
import { ConsultaDisponibilidadeComponent } from './consulta-disponibilidade/consulta-disponibilidade.component';
import { DisponibilidadeFormComponent } from './disponibilidade-form/disponibilidade-form.component';

@NgModule({ 
  imports: [
    CommonModule,
    AgendaRoutingModule,
    FullCalendarModule
  ],
  declarations: [
    CalendarioAgendaComponent, 
    ConsultaAgendaComponent, 
    AgendaComponent, 
    ConsultaDisponibilidadeComponent, 
    DisponibilidadeFormComponent
  ]
})
export class AgendaModule { }
