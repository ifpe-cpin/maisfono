import { Component, OnInit } from '@angular/core';

import { ListaPacientes } from './pacientes/listapacientes';

declare var $:any;

@Component({
  selector: 'app-consultar-meus',
  templateUrl: './consultar-meus.component.html',
  styleUrls: ['./consultar-meus.component.css']
})
export class ConsultarMeusComponent implements OnInit {

   listaPaciente: ListaPacientes[];


  constructor() {
  	this.listaPaciente = [
       {nome: 'Ana Hillary dos Santos Silva', email: 'pamela@gmail.com', telefone: '(82) 99999-9999'},
        {nome: 'João Jose Santos', email: 'jjs@gmail.com', telefone: '(82) 99999-9999'}
     ];
   }


  ngOnInit() {
      
		$(function () {
			$("#pacientesMeus").DataTable();
		});
  }

}
