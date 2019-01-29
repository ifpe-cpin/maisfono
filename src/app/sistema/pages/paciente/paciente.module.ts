import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente.routing.module';
import { PacienteAdminComponent } from './paciente-admin/paciente-admin.component';
import { PacienteDetalheComponent } from './paciente-detalhe/paciente-detalhe.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { PacienteComponent } from './paciente.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ConsultarMeusComponent } from './consultar-meus/consultar-meus.component';
import { PacienteEvolucaoComponent } from './paciente-evolucao/paciente-evolucao.component';
import { PacienteLaudoComponent } from './paciente-laudo/paciente-laudo.component';
import { PacienteFonoComponent } from './paciente-fono/paciente-fono.component';
import { SistemaModule } from '../../sistema.module';
import { VincularFonoComponent } from './vincular-fono/vincular-fono.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	PacienteRoutingModule,
	SistemaModule
	
  ],
  declarations: [
	PacienteAdminComponent,
  	PacienteDetalheComponent, 
  	PacienteFormComponent,
  	PacienteComponent, 
  	ConsultaComponent, 
  	ConsultarMeusComponent, 
	PacienteEvolucaoComponent,
	PacienteLaudoComponent,
	PacienteFonoComponent,
	VincularFonoComponent
  	]
})
export class PacienteModule { }
 