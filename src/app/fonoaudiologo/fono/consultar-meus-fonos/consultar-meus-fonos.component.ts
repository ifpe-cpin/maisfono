import { Component, OnInit } from '@angular/core';

import { Fono } from '../../models/fono/fono';

import { FonoService } from '../../../services/fono.service';

declare var $:any;

@Component({
  selector: 'app-consultar-meus-fonos',
  templateUrl: './consultar-meus-fonos.component.html',
  styleUrls: ['./consultar-meus-fonos.component.css'],
  providers: [FonoService]
})
export class ConsultarMeusFonosComponent implements OnInit {

  fono: Fono;

  constructor(private fonoService: FonoService) {
  } 
  

  ngOnInit() {
    
    this.fono = this.fonoService.getFono();
    
    $(function () {
			$("#pacientes").DataTable();
		});
  }
}
