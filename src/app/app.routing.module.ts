import { NgModule } from '@angular/core';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { SistemaComponent } from './sistema/sistema.component';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserAdminComponent } from './sistema/user/user-admin/user-admin.component';
import { User } from './models/user';
import { UserModule } from './sistema/user/user.module';



const appRoutes: Routes = [
	{ path: '', component: LoginComponent},
	{ path: 'fonoaudiologo', component: SistemaComponent, canActivate: [AuthGuard]},
	
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