import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente.routing.module';
import { PacienteDetalheComponent } from './paciente-detalhe/paciente-detalhe.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { PacienteComponent } from './paciente.component';

@NgModule({
  imports: [
    CommonModule,
    PacienteRoutingModule
  ],
  declarations: [PacienteDetalheComponent, PacienteFormComponent, PacienteComponent]
})
export class PacienteModule { }
