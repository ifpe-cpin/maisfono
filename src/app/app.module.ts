import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { HomeComponent } from './home/home.component';


import { HomeModule } from './home/home.module';
import { FonoModule } from './home/fono/fono.module';
import { PacienteModule } from './home/paciente/paciente.module';
import { AppRoutingModule } from './app.routing.module';

// import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    // HomeComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    FonoModule,
    PacienteModule,     
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
