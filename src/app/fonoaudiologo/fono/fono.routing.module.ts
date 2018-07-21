import { NgModule} from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { FonoComponent } from './fono.component';
import { FonoFormComponent  } from './fono-form/fono-form.component';
import { FonoDetalheComponent } from './fono-detalhe/fono-detalhe.component';
import { FonoAdminComponent } from './fono-admin/fono-admin.component';



const fonoRoutes = [
		{path: 'fono', component: FonoComponent, children: [
					{path: 'novo', component: FonoFormComponent},
					{path: 'ver', component: FonoDetalheComponent},
					{path: 'admin', component: FonoAdminComponent},
					// {path: ':id/editar', component: FonoFormComponent}
		]}

];

@NgModule({
	imports: [
    RouterModule.forChild(fonoRoutes),
  ],
  exports:[RouterModule]
})
export class FonoRoutingModule{}