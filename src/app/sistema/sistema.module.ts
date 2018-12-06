import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing.module';
import { SistemaComponent } from './sistema.component';
import { DashComponent } from './dash/dash.component';
import { VideoComponent } from './video/video.component';
import { PacienteModule } from './paciente/paciente.module';
import { PacienteSelecionarComponent } from './paciente/paciente-selecionar/paciente-selecionar.component';
import { RoleMenuComponent } from '../role-menu/role-menu.component';
import { LoadComponent } from '../load/load.component';
import { AppModule } from '../app.module';
import { VideochamadaComponent } from '../videochamada/videochamada.component';




@NgModule({
  imports: [
    CommonModule,
    PacienteModule,
    HomeRoutingModule,
   
   
  ],
  declarations: [SistemaComponent,
     DashComponent,
     VideoComponent,
     LoadComponent,
     PacienteSelecionarComponent,
    RoleMenuComponent,
    VideochamadaComponent],
    exports:[LoadComponent]
})
export class SistemaModule { }
