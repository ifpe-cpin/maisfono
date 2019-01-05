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
import { RoleMenuComponent } from './role-menu/role-menu.component';
import { LoadComponent } from './load/load.component';
import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc'; 

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from "angular5-social-auth";

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("449875052890-b486rnik4snau6n34lk28940kh9lt1dj.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}

const agoraConfig: AgoraConfig = {
  AppID: '6b428753b1fe4c54b7f6f4ea88d62d57',
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponent,
    DashboardComponent,
    MeusDadosComponent,
    ConfirmDialogComponent,
    //UserAdminComponent,
    //LoadComponent,
    //RoleMenuComponent,
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
    MatDialogModule, 
    UserModule,
    AngularAgoraRtcModule.forRoot(agoraConfig)
    
  ],
  exports:[LoadComponent],

  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  
  bootstrap: [AppComponent]
})

export class AppModule { }
