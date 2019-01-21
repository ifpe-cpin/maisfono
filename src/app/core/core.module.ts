import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from 'angular5-social-auth';
import { FonoGuard } from './fono.guard';
import { PacienteGuard } from './paciente.guard';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers:[
    AuthGuard,
    AuthService,
    FonoGuard,
    PacienteGuard
  ]
})
export class CoreModule { }
