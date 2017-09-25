import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})

export class ConsultaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function () {
			$("#pacientes").DataTable();
		});
  }

}
