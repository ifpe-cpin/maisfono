import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JogosRoutingModule } from './jogos.routing.module';
import { JogosComponent } from './jogos.component';
import { ListaJogosComponent } from './lista-jogos/lista-jogos.component';

@NgModule({
  imports: [
    CommonModule,
    JogosRoutingModule
  ],
  declarations: [JogosComponent, ListaJogosComponent]
})
export class JogosModule { } 
