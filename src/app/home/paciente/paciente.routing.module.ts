import { NgModule} from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { PacienteComponent } from './paciente.component';
import { PacienteFormComponent  } from './paciente-form/paciente-form.component';
import { PacienteDetalheComponent } from './paciente-detalhe/paciente-detalhe.component';



const pacienteRoutes = [
		{path: 'paciente', component: PacienteComponent, children: [
					{path: 'novo', component: PacienteFormComponent},
					{path: 'ver', component: PacienteDetalheComponent},
					// {path: ':id/editar', component: FonoFormComponent}
		]}

];

@NgModule({
	imports: [
    RouterModule.forChild(pacienteRoutes),
  ],
  exports:[RouterModule]
})
export class PacienteRoutingModule{} 