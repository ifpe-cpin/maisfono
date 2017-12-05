import { NgModule } from '@angular/core';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FonoaudiologoComponent } from './fonoaudiologo/fonoaudiologo.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { PacienteComponent } from './paciente/paciente.component';



const appRoutes: Routes = [
	{ path: '', component: LoginComponent},
	{ path: 'fonoaudiologo', component: FonoaudiologoComponent},
	{ path: 'newUser', component: NovoUsuarioComponent},
	{ path: 'paciente', component: PacienteComponent}
];
;

@NgModule({
	imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports:[RouterModule]
})

export class AppRoutingModule {

}