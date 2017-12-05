import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovoUsuarioRoutingModule } from './novo-usuario.routing.module';
import { NovoUsuarioComponent } from './novo-usuario.component';
import { FonoComponent } from './fono/fono.component';
import { PacienteComponent } from './paciente/paciente.component';


@NgModule({
  imports: [
    CommonModule,
    NovoUsuarioRoutingModule
  ],
  declarations: [NovoUsuarioComponent, FonoComponent, PacienteComponent]
})
export class NovoUsuarioModule { }
