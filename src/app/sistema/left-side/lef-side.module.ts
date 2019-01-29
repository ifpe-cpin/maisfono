import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftSideComponent } from './left-side.component';
import { DashComponent } from '../pages/dash/dash.component';
import { VideoComponent } from '../pages/video/video.component';
import { PacienteModule } from '../pages/paciente/paciente.module';
import { PacienteSelecionarComponent } from '../pages/paciente/paciente-selecionar/paciente-selecionar.component';
import { RoleMenuComponent } from '../../role-menu/role-menu.component';
//import { LoadComponent } from '../load/load.component';
import { AppModule } from '../../app.module';


@NgModule({
  imports: [
        CommonModule,
        PacienteModule,
        //AppRoutingModule,
   
  ],
  declarations: [
        //LeftSideComponent,
        //DashComponent,
       // VideoComponent,
        // LoadComponent,
       // PacienteSelecionarComponent,
        //RoleMenuComponent
      ],
        //exports:[LoadComponent]
})
export class LeftSideModule { }
