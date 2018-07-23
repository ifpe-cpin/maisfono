import { NgModule} from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { FonoaudiologoComponent } from './fonoaudiologo.component';

import { FonoComponent } from './fono/fono.component';
import { ConsultarFonoComponent  } from './fono/consultar-fono/consultar-fono.component';
import { ConsultarMeusFonosComponent  } from './fono/consultar-meus-fonos/consultar-meus-fonos.component';
import { FonoFormComponent  } from './fono/fono-form/fono-form.component';
import { FonoDetalheComponent } from './fono/fono-detalhe/fono-detalhe.component';

import { PacienteComponent } from './paciente/paciente.component';
import { ConsultaComponent  } from './paciente/consulta/consulta.component';
import { ConsultarMeusComponent  } from './paciente/consultar-meus/consultar-meus.component';
import { PacienteEvolucaoComponent  } from './paciente/paciente-evolucao/paciente-evolucao.component';
import { PacienteFormComponent  } from './paciente/paciente-form/paciente-form.component';
import { PacienteDetalheComponent } from './paciente/paciente-detalhe/paciente-detalhe.component';

import { AgendaComponent } from './agenda/agenda.component';
import { ConsultaAgendaComponent  } from './agenda/consulta-agenda/consulta-agenda.component';
import { CalendarioAgendaComponent  } from './agenda/calendario-agenda/calendario-agenda.component';

import { DashComponent } from './dash/dash.component';

import { JogosComponent } from "./jogos/jogos.component";
import { ListaJogosComponent } from "./jogos/lista-jogos/lista-jogos.component";
import { VideoComponent } from './video/video.component';
import { PacienteSelecionarComponent } from './paciente/paciente-selecionar/paciente-selecionar.component';


import { PerfilComponent } from "./perfil/perfil.component";
import { DashboardComponent } from "./perfil/dashboard/dashboard.component";
import { MeusDadosComponent } from "./perfil/meus-dados/meus-dados.component";
import { FonoAdminComponent } from './fono/fono-admin/fono-admin.component';
import { PacienteAdminComponent } from './paciente-admin/paciente-admin.component';


const homeRoutes = [
		{path: 'fonoaudiologo', component: FonoaudiologoComponent, children:[
			{path: 'fono', component: FonoComponent, children: [
						{path: 'novo', component: FonoFormComponent},
						{path: 'ver', component: FonoDetalheComponent},
						{path: 'admin', component: FonoAdminComponent},
						// {path: ':id/editar', component: FonoFormComponent}
			]},
			{path: 'fono', component: FonoComponent, children: [
				{path: 'consulta', component: ConsultarFonoComponent},
				{path: 'consultarMeusFonos', component: ConsultarMeusFonosComponent},
				// {path: ':id/editar', component: FonoFormComponent}
			]},
			{path: 'paciente', component: PacienteComponent, children: [
				{path: 'consulta', component: ConsultaComponent},
				{path: 'consultarMeus', component: ConsultarMeusComponent},
				{path: 'evolucao', component: PacienteEvolucaoComponent},
				{path: 'novo', component: PacienteFormComponent},
				{path: 'ver', component: PacienteDetalheComponent},
				{path: 'admin', component: PacienteAdminComponent},
				// {path: ':id/editar', component: FonoFormComponent}
			]},
			{path: 'jogos', component: JogosComponent, children: [
				{path: 'listaJogos', component: ListaJogosComponent},
			]},
			{path: 'agenda', component: AgendaComponent, children: [
				{path: 'consultaAgenda', component: ConsultaAgendaComponent},
				{path: 'calendarioAgenda', component: CalendarioAgendaComponent},
			]},
			{path: 'perfil', component: PerfilComponent, children: [
				{path: 'dashboard', component: DashboardComponent},
				{path: 'meusDados', component: MeusDadosComponent},
			]},
			{path: 'dash', component: DashComponent},
			{path: 'video', component: PacienteSelecionarComponent}
		]}

];

@NgModule({
	imports: [
    RouterModule.forChild(homeRoutes),
  ],
  exports:[RouterModule]
})
export class HomeRoutingModule{}