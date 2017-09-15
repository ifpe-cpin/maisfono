import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';



const app_routes: Routes = [
	{ path: '', component: LoginComponent},
	{ path: 'home', component: HomeComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(app_routes);