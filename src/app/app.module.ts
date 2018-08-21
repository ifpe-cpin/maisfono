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
import { PacienteComponent } from './paciente/paciente.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { FonoComponent } from './novo-usuario/fono/fono.component';
import { PerfilComponent } from './fonoaudiologo/perfil/perfil.component';
import { DashboardComponent } from './fonoaudiologo/perfil/dashboard/dashboard.component';
import { MeusDadosComponent } from './fonoaudiologo/perfil/meus-dados/meus-dados.component';

import { firebaseConfig } from '../firebase-config';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material';


import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from "angular5-social-auth";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { GridViewComponent } from './grid-view/grid-view.component';

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
    MeusDadosComponent,
    ConfirmDialogComponent,
    //GridViewComponent   
    // HomeComponent
  ],
  entryComponents:[ConfirmDialogComponent],
  imports: [
    BrowserModule,
    FonoaudiologoModule,
    FonoModule,
    PacienteModule,  
    JogosModule, 
    FormsModule,
    AgendaModule,  
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    BrowserAnimationsModule,  
    MatDialogModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
