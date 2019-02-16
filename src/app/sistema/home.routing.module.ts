import { NgModule} from '@angular/core';

import { RouterModule, CanActivate } from '@angular/router';

import { SistemaComponent } from './sistema.component';

import { FonoComponent } from './pages/fono/fono.component';
import { ConsultarFonoComponent  } from './pages/fono/consultar-fono/consultar-fono.component';
import { ConsultarMeusFonosComponent  } from './pages/fono/consultar-meus-fonos/consultar-meus-fonos.component';
import { FonoFormComponent  } from './pages/fono/fono-form/fono-form.component';
import { FonoDetalheComponent } from './pages/fono/fono-detalhe/fono-detalhe.component';

import { ConsultaComponent  } from './pages/paciente/consulta/consulta.component';
import { PacienteAdminComponent  } from './pages/paciente/paciente-admin/paciente-admin.component';
import { ConsultarMeusComponent  } from './pages/paciente/consultar-meus/consultar-meus.component';
import { PacienteEvolucaoComponent  } from './pages/paciente/paciente-evolucao/paciente-evolucao.component';
import { PacienteFormComponent  } from './pages/paciente/paciente-form/paciente-form.component';
import { PacienteDetalheComponent } from './pages/paciente/paciente-detalhe/paciente-detalhe.component';

import { AgendaComponent } from './pages/agenda/agenda.component';
import { ConsultaAgendaComponent  } from './pages/agenda/consulta-agenda/consulta-agenda.component';
import { CalendarioAgendaComponent  } from './pages/agenda/calendario-agenda/calendario-agenda.component';

import { DashComponent } from './pages/dash/dash.component';

import { JogosComponent } from "./pages/jogos/jogos.component";
import { ListaJogosComponent } from "./pages/jogos/lista-jogos/lista-jogos.component";
import { VideoComponent } from './pages/video/video.component';
import { PacienteSelecionarComponent } from './pages/paciente/paciente-selecionar/paciente-selecionar.component';


import { PerfilComponent } from "./pages/perfil/perfil.component";
import { DashboardComponent } from "./pages/perfil/dashboard/dashboard.component";
import { MeusDadosComponent } from "./pages/perfil/meus-dados/meus-dados.component";
import { AuthGuard } from '../core/auth.guard';import { UserUpdateComponent } from './pages/user/user-update/user-update.component';
import { AdminGuard } from '../core/admin.guard';
import { FonoGuard } from '../core/fono.guard';
import { FonoAdminComponent } from './pages/fono/fono-admin/fono-admin.component';
import { UserAdminComponent } from './pages/user/user-admin/user-admin.component';
import { UserViewComponent } from './pages/user/user-view/user-view.component';
import { PacienteLaudoComponent } from './pages/paciente/paciente-laudo/paciente-laudo.component';
import { VideochamadaComponent } from '../videochamada/videochamada.component';
import { ConsultaDisponibilidadeComponent } from './pages/agenda/consulta-disponibilidade/consulta-disponibilidade.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PacienteFonoComponent } from './pages/paciente/paciente-fono/paciente-fono.component';
import { DisponibilidadeFormComponent }  from './pages/agenda/disponibilidade-form/disponibilidade-form.component';
import { PacienteGuard } from '../core/paciente.guard';
import { UserCreateComponent } from './pages/user/user-create/user-create.component';
import { PacienteDashComponent } from './pages/paciente/paciente-dash/paciente-dash.component';
import { DashPacienteComponent } from './pages/dash-paciente/dash-paciente.component';

const homeRoutes = [
		{path: 'sistema', component: SistemaComponent, children:[
			{ path: 'video',children:[
				{path: 'play',component:VideochamadaComponent, canActivate:[AdminGuard]},
				
			]},
			{ path: 'user',children:[
				{path: 'atualizar',component:UserUpdateComponent, canActivate:[AdminGuard]},
				{path: 'admin',component:UserAdminComponent, canActivate:[AdminGuard]},
				{path: 'ver',component:UserViewComponent, canActivate:[AdminGuard]},
				{path: 'novo',component:UserCreateComponent},

			]},
			{path: 'paciente', component: PacienteComponent, children: [
				{path: 'paciente-fono', component: PacienteFonoComponent, canActivate: [PacienteGuard]},
				{path: 'admin',component:PacienteAdminComponent, canActivate:[AdminGuard]},
				{path: 'ver',component:PacienteDetalheComponent, canActivate:[AdminGuard]},
				{path: 'novo',component:PacienteFormComponent},
			]},
			{path: 'fonoaudiologo', component: FonoComponent, children: [

				{path: 'novo', component: FonoFormComponent, canActivate: [FonoGuard]},
				{path: 'ver', component: FonoDetalheComponent, canActivate: [FonoGuard]},
				{path: 'admin', component: FonoAdminComponent, canActivate: [FonoGuard]},
				{path: 'consulta', component: ConsultarFonoComponent, canActivate: [FonoGuard]},
				{path: 'consultarMeusFonos', component: ConsultarMeusFonosComponent, canActivate: [FonoGuard]},
				{path: 'consultarPacientes', component: ConsultaComponent, canActivate: [FonoGuard]},
				{path: 'consultarMeus', component: ConsultarMeusComponent, canActivate: [FonoGuard]},
				{path: 'evolucao/:id', component: PacienteEvolucaoComponent, canActivate: [FonoGuard]},
				{path: 'laudo/:id', component: PacienteLaudoComponent, canActivate: [FonoGuard]},
				{path: 'novo', component: PacienteFormComponent, canActivate: [FonoGuard]},
				{path: 'ver', component: PacienteDetalheComponent, canActivate: [FonoGuard]},
				{path: 'dashPaciente/:id', component: PacienteDashComponent, canActivate: [FonoGuard]},
				{path: 'agenda', component: AgendaComponent, children: [
					{path: 'consultaAgenda', component: ConsultaAgendaComponent, canActivate: [AuthGuard,AdminGuard]},
					{path: 'calendarioAgenda', component: CalendarioAgendaComponent, canActivate: [AuthGuard,AdminGuard]},
					{path: 'calendarioDisponibilidade', component: ConsultaDisponibilidadeComponent, canActivate: [AuthGuard,AdminGuard]},
					{path: 'incluiDisponibilidade', component: DisponibilidadeFormComponent, canActivate: [AuthGuard,AdminGuard]},
				]},
			]},
			{path: 'jogos', component: JogosComponent, children: [
				{path: 'jogoMemoria', component: ListaJogosComponent, canActivate: [AuthGuard,AdminGuard]},
			]},
			{path: 'perfil', component: PerfilComponent, children: [
				{path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard,AdminGuard]},
				{path: 'meusDados', component: MeusDadosComponent, canActivate: [AuthGuard,AdminGuard]},
			]},
			{path: 'dash', component: DashComponent,canActivate: [AuthGuard]},
			{path: 'dashPaciente', component: DashPacienteComponent,canActivate: [AuthGuard]},
			{path: 'video', component: PacienteSelecionarComponent, canActivate: [AuthGuard,AdminGuard]}
		]}

];

@NgModule({
	imports: [
    RouterModule.forChild(homeRoutes),
  ],
  exports:[RouterModule],
  providers:[
	AdminGuard
]
})
export class HomeRoutingModule{}