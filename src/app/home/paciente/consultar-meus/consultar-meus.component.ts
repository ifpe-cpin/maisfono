import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-consultar-meus',
  templateUrl: './consultar-meus.component.html',
  styleUrls: ['./consultar-meus.component.css']
})
export class ConsultarMeusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      
		$(function () {
			$("#pacientesMeus").DataTable();
		});
  }

}
