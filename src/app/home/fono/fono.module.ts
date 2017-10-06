import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FonoRoutingModule } from './fono.routing.module';
import { FonoDetalheComponent } from './fono-detalhe/fono-detalhe.component';
import { FonoFormComponent } from './fono-form/fono-form.component';
import { FonoComponent } from './fono.component';
import { ConsultarFonoComponent } from './consultar-fono/consultar-fono.component';
import { ConsultarMeusFonosComponent } from './consultar-meus-fonos/consultar-meus-fonos.component';

@NgModule({
  imports: [
    CommonModule,
    FonoRoutingModule
  ],
  declarations: [FonoDetalheComponent, FonoFormComponent, FonoComponent, ConsultarFonoComponent, ConsultarMeusFonosComponent]
})
export class FonoModule { }
