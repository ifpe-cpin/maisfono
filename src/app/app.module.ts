import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FonoaudiologoModule } from './fonoaudiologo/fonoaudiologo.module';
import { FonoModule } from './fonoaudiologo/fono/fono.module';
import { AgendaModule } from './fonoaudiologo/agenda/agenda.module';
import { PacienteModule } from './fonoaudiologo/paciente/paciente.module';
import { AppRoutingModule } from './app.routing.module';
import { JogosModule } from "./fonoaudiologo/jogos/jogos.module";
import { PerfilComponent } from './fonoaudiologo/perfil/perfil.component';
import { DashboardComponent } from './fonoaudiologo/perfil/dashboard/dashboard.component';
import { MeusDadosComponent } from './fonoaudiologo/perfil/meus-dados/meus-dados.component';

import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';






// import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { UserAdminComponent } from './fonoaudiologo/user/user-admin/user-admin.component';
import { UserModule } from './fonoaudiologo/user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    FonoaudiologoModule,
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
