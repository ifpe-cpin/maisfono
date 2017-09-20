import { NgModule} from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AgendaComponent } from './agenda.component';
import { CalendarioAgendaComponent  } from './calendario-agenda/calendario-agenda.component';
import { ConsultaAgendaComponent } from './consulta-agenda/consulta-agenda.component';



const agendaRoutes = [
		{path: 'paciente', component: AgendaComponent, children: [
					{path: 'calendarioAgenda', component: CalendarioAgendaComponent},
					{path: 'consultaAgenda', component: ConsultaAgendaComponent},
		]}

];

@NgModule({
	imports: [
    RouterModule.forChild(agendaRoutes),
  ],
  exports:[RouterModule]
})
export class AgendaRoutingModule{}