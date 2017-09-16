import { NgModule} from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';


import { FonoComponent } from './fono/fono.component';
import { FonoFormComponent  } from './fono/fono-form/fono-form.component';
import { FonoDetalheComponent } from './fono/fono-detalhe/fono-detalhe.component';

import { PacienteComponent } from './paciente/paciente.component';
import { PacienteFormComponent  } from './paciente/paciente-form/paciente-form.component';
import { PacienteDetalheComponent } from './paciente/paciente-detalhe/paciente-detalhe.component';


const homeRoutes = [
		{path: 'home', component: HomeComponent, children:[
			{path: 'fono', component: FonoComponent, children: [
						{path: 'novo', component: FonoFormComponent},
						{path: 'ver', component: FonoDetalheComponent},
						// {path: ':id/editar', component: FonoFormComponent}
			]},
			{path: 'paciente', component: PacienteComponent, children: [
					{path: 'novo', component: PacienteFormComponent},
					{path: 'ver', component: PacienteDetalheComponent},
					// {path: ':id/editar', component: FonoFormComponent}
			]}
		]}

];

@NgModule({
	imports: [
    RouterModule.forChild(homeRoutes),
  ],
  exports:[RouterModule]
})
export class HomeRoutingModule{}