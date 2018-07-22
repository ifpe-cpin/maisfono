import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovoUsuarioRoutingModule } from './novo-usuario.routing.module';
import { NovoUsuarioComponent } from './novo-usuario.component';
import { FonoComponent } from './fono/fono.component';
import { PacienteComponent } from './paciente/paciente.component';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    NovoUsuarioRoutingModule,
    FormsModule,
    FormGroup,
    FormControl,
    ReactiveFormsModule,
  ],
  declarations: [NovoUsuarioComponent, FonoComponent, PacienteComponent]
})
export class NovoUsuarioModule { }
