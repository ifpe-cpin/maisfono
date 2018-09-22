import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { SistemaModule } from './sistema/sistema.module';
import { FonoModule } from './sistema/fono/fono.module';
import { AgendaModule } from './sistema/agenda/agenda.module';
import { PacienteModule } from './sistema/paciente/paciente.module';
import { AppRoutingModule } from './app.routing.module';
import { JogosModule } from "./sistema/jogos/jogos.module";
import { PacienteComponent } from './paciente/paciente.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { FonoComponent } from './novo-usuario/fono/fono.component';
import { PerfilComponent } from './sistema/perfil/perfil.component';
import { DashboardComponent } from './sistema/perfil/dashboard/dashboard.component';
import { MeusDadosComponent } from './sistema/perfil/meus-dados/meus-dados.component';

import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';






// import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { UserAdminComponent } from './sistema/user/user-admin/user-admin.component';
import { UserModule } from './sistema/user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PacienteComponent,
    NovoUsuarioComponent,
    FonoComponent,
    PerfilComponent,
    DashboardComponent,
    MeusDadosComponent,
    ConfirmDialogComponent,
    //GridViewComponent   
    // HomeComponent
  ],
  entryComponents:[ConfirmDialogComponent],
  imports: [
    CoreModule,
    BrowserModule,
    SistemaModule,
    FonoModule,
    PacienteModule,  
    JogosModule, 
    FormsModule,
    AgendaModule,  
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,  
    MatDialogModule, UserModule,
    
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
