import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FonoaudiologoModule } from './fonoaudiologo/fonoaudiologo.module';
import { FonoModule } from './fonoaudiologo/fono/fono.module';
import { AgendaModule } from './fonoaudiologo/agenda/agenda.module';
import { PacienteModule } from './fonoaudiologo/paciente/paciente.module';
import { AppRoutingModule } from './app.routing.module';
import { JogosModule } from "./fonoaudiologo/jogos/jogos.module";
import { PacienteComponent } from './paciente/paciente.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { FonoComponent } from './novo-usuario/fono/fono.component';
import { PerfilComponent } from './fonoaudiologo/perfil/perfil.component';
import { DashboardComponent } from './fonoaudiologo/perfil/dashboard/dashboard.component';
import { MeusDadosComponent } from './fonoaudiologo/perfil/meus-dados/meus-dados.component';

// import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PacienteComponent,
    NovoUsuarioComponent,
    FonoComponent,
    PerfilComponent,
    DashboardComponent,
    MeusDadosComponent    
    // HomeComponent
  ],
  imports: [
    BrowserModule,
    FonoaudiologoModule,
    FonoModule,
    PacienteModule,  
    JogosModule, 
    FormsModule,
    AgendaModule,  
    AppRoutingModule,
    HttpModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
