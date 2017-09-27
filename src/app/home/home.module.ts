import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { DashComponent } from './dash/dash.component';
import { VideoComponent } from './video/video.component';
import { PacienteModule } from './paciente/paciente.module';
import { PacienteSelecionarComponent } from './paciente/paciente-selecionar/paciente-selecionar.component';


@NgModule({
  imports: [
    CommonModule,
    PacienteModule,
    HomeRoutingModule
   
  ],
  declarations: [HomeComponent, DashComponent,VideoComponent,PacienteSelecionarComponent]
})
export class HomeModule { }
