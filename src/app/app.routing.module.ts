import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { SistemaComponent } from './sistema/sistema.component';
import { AuthGuard } from './core/auth.guard';




const appRoutes: Routes = [
	{ path: '', component: LoginComponent},
	{ path: 'sistema', component: SistemaComponent, canActivate: [AuthGuard]},
	
];
;

@NgModule({
	imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports:[RouterModule],
  providers:[
  ]
})

export class AppRoutingModule {

}