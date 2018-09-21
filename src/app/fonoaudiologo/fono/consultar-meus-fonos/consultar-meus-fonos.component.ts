import { Component, OnInit } from '@angular/core';


import { FonoaudiologoService } from '../../../services/fonoaudiologo.service';
import { Fono } from '../../../models/fono';

declare var $:any;

@Component({
  selector: 'app-consultar-meus-fonos',
  templateUrl: './consultar-meus-fonos.component.html',
  styleUrls: ['./consultar-meus-fonos.component.css'],
  providers: [FonoaudiologoService]
})
export class ConsultarMeusFonosComponent implements OnInit {

  fono: Fono[];

  constructor(private fonoService: FonoaudiologoService) {
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
