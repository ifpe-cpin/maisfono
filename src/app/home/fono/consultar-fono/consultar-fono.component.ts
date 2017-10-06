import { Component, OnInit } from '@angular/core';

import { Fono } from '../../models/fono/fono';

import { FonoService } from '../../../services/fono.service';

declare var $:any;

@Component({
  selector: 'app-consultar-fono',
  templateUrl: './consultar-fono.component.html',
  styleUrls: ['./consultar-fono.component.css'],
 	providers: [FonoService]
})
export class ConsultarFonoComponent implements OnInit {

  fono: Fono;



  constructor(private fonoService: FonoService) {
  
     
   } 

   OpenRum(){
     var new_window = window.open('https://hangouts.google.com/hangouts/_/jyg7ajkibnf6pkmp7fqernkt7ue',"Hangout",'fullscreen=yes');
   }
  

  ngOnInit() {
    
    this.fono = this.fonoService.getFono();
    
    $(function () {
			$("#pacientes").DataTable();
		});
  }
}
