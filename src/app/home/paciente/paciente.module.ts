import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente.routing.module';
import { PacienteDetalheComponent } from './paciente-detalhe/paciente-detalhe.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { PacienteComponent } from './paciente.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ConsultarMeusComponent } from './consultar-meus/consultar-meus.component';

@NgModule({
  imports: [
    CommonModule,
    PacienteRoutingModule
  ],
  declarations: [PacienteDetalheComponent, PacienteFormComponent, PacienteComponent, ConsultaComponent, ConsultarMeusComponent]
})
export class PacienteModule { }
 