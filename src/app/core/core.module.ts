import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthGuard } from './auth.guard';
import { AuthService } from 'angular5-social-auth';
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from '../../environments/firebase.config';
import { FonoGuard } from './fono.guard';
import { PacienteGuard } from './paciente.guard';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(FirebaseConfig),
  ],
  declarations: [],
  providers:[
    AuthGuard,
    AuthService,
    FonoGuard,
    PacienteGuard
  ]
})
export class CoreModule { }
