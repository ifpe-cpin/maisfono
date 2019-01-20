import { NgModule} from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { PerfilComponent } from './perfil.component';
import { DashboardComponent  } from './dashboard/dashboard.component';
import { MeusDadosComponent  } from './meus-dados/meus-dados.component';



const perfilRoutes = [
		{path: 'perfil', component: PerfilComponent, children: [
				{path: 'dashboard', component: DashboardComponent},
				{path: 'meus-dados', component: MeusDadosComponent}
		]}

];

@NgModule({
	imports: [
    RouterModule.forChild(perfilRoutes),
  ],
  exports:[RouterModule]
})
export class PerfilRoutingModule{} 