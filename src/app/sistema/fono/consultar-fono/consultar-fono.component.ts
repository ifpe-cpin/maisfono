import { Component, OnInit } from '@angular/core';

import { Fonoaudiologo } from '../../../models/fonoaudiologo';

import { FonoService } from '../../../services/fono.service';

import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs';

declare var $:any;

@Component({
  selector: 'app-consultar-fono',
  templateUrl: './consultar-fono.component.html',
  styleUrls: ['./consultar-fono.component.css'],
 	providers: [FonoService]
})
export class ConsultarFonoComponent implements OnInit {

  //fonoaudiologo: Observable<Fonoaudiologo[]>;
  constructor(db: AngularFireDatabase ) {
      //db.list<Item>('items').valueChanges().subscribe(console.log);
      //const fonoaudiologo = db.list('/tb_fonoaudiologo').valueChanges().subscribe(console.log)
     
      //console.log(this.fonoaudiologo)

      const afList = db.list('items');
      afList.push({ name: 'fono' });
      const listObservable = afList.snapshotChanges();
      listObservable.subscribe();
   } 

   OpenRum(){
     var new_window = window.open('https://hangouts.google.com/hangouts/_/jyg7ajkibnf6pkmp7fqernkt7ue',"Hangout",'fullscreen=yes');
   }
  

  ngOnInit() {
    
    
    $(function () {
			$("#pacientes").DataTable();
		});
  }
}
