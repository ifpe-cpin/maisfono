import { Component, OnInit } from '@angular/core';


import { FonoaudiologoService } from '../../../../services/fonoaudiologo.service';
import { Fonoaudiologo } from '../../../../models/fonoaudiologo';

declare var $:any;

@Component({
  selector: 'app-consultar-meus-fonos',
  templateUrl: './consultar-meus-fonos.component.html',
  styleUrls: ['./consultar-meus-fonos.component.css'],
  providers: [FonoaudiologoService]
})
export class ConsultarMeusFonosComponent implements OnInit {

  fono: Fonoaudiologo[];

  constructor(private fonoService: FonoaudiologoService) {
  } 
  

  ngOnInit() {
        
    $(function () {
			$("#pacientes").DataTable();
		});
  }
}
