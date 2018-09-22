import { Component, OnInit } from '@angular/core';


import { FonoaudiologoService } from '../../../services/fonoaudiologo.service';
import { Fono } from '../../../models/fono';


import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs';

declare var $:any;

@Component({
  selector: 'app-consultar-fono',
  templateUrl: './consultar-fono.component.html',
  styleUrls: ['./consultar-fono.component.css'],
 	providers: [FonoaudiologoService]
})
export class ConsultarFonoComponent implements OnInit {

  fono: Fono[];



  constructor(private fonoService: FonoaudiologoService) {
  
     
      //console.log(this.fonoaudiologo)

      // const afList = db.list('items');
      // afList.push({ name: 'fono' });
      // const listObservable = afList.snapshotChanges();
      // listObservable.subscribe();
   } 

   OpenRum(){
     var new_window = window.open('https://hangouts.google.com/hangouts/_/jyg7ajkibnf6pkmp7fqernkt7ue',"Hangout",'fullscreen=yes');
   }
  

  ngOnInit() {
    
    this.fonoService.getAll().subscribe(
      fono => this.fono = fono
    );
    
    $(function () {
			$("#pacientes").DataTable();
		});
  }
}
