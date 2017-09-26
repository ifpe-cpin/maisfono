import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


import { HomeModule } from './home/home.module';
import { FonoModule } from './home/fono/fono.module';
import { AgendaModule } from './home/agenda/agenda.module';
import { PacienteModule } from './home/paciente/paciente.module';
import { AppRoutingModule } from './app.routing.module';
import { JogosModule } from "./home/jogos/jogos.module";

// import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent    
    // HomeComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
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
