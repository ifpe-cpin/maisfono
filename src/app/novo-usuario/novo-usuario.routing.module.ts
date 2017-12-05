import { NgModule} from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { NovoUsuarioComponent } from './novo-usuario.component';
import { FonoComponent } from './fono/fono.component';
import { PacienteComponent } from './paciente/paciente.component';

const novoUsuarioRoutes = [
		{path: 'newUser', component: NovoUsuarioComponent, children:[
			{path: 'cadFono', component: FonoComponent },
			{path: 'cadPac', component: PacienteComponent},
		]}

];

@NgModule({
	imports: [
    RouterModule.forChild(novoUsuarioRoutes),
  ],
  exports:[RouterModule]
})
export class NovoUsuarioRoutingModule{}