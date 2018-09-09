import { NgModule } from '@angular/core';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FonoaudiologoComponent } from './fonoaudiologo/fonoaudiologo.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { PacienteComponent } from './paciente/paciente.component';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserAdminComponent } from './fonoaudiologo/user/user-admin/user-admin.component';
import { User } from './models/user';
import { UserModule } from './fonoaudiologo/user/user.module';



const appRoutes: Routes = [
	{ path: '', component: LoginComponent},
	{ path: 'fonoaudiologo', component: FonoaudiologoComponent, canActivate: [AuthGuard]},
	{ path: 'newUser', component: NovoUsuarioComponent,canActivate: [AuthGuard]},
	{ path: 'paciente', component: PacienteComponent,canActivate: [AuthGuard]},
	
];
;

@NgModule({
	imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports:[RouterModule],
  providers:[
	  AuthService
  ]
})

export class AppRoutingModule {

}