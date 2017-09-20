import { NgModule} from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { JogosComponent } from './jogos.component';
import { ListaJogosComponent  } from './lista-jogos/lista-jogos.component';



const jogosRoutes = [
		{path: 'jogos', component: JogosComponent, children: [
				{path: 'listaJogos', component: ListaJogosComponent}
		]}

];

@NgModule({
	imports: [
    RouterModule.forChild(jogosRoutes),
  ],
  exports:[RouterModule]
})
export class JogosRoutingModule{} 