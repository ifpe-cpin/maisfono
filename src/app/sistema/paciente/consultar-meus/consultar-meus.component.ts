import { Component, OnInit } from '@angular/core';
// import { Lista } from '../lista-pacientes/lista.model';
import { Paciente } from '../../models/paciente/paciente';

import { PacienteFormComponent } from '../paciente-form/paciente-form.component';

import { PacientesService } from '../../../services/pacientes.service';

declare var $:any;

@Component({
  selector: 'app-consultar-meus',
  templateUrl: './consultar-meus.component.html',
  styleUrls: ['./consultar-meus.component.css'],
  providers: [PacientesService]
})
export class ConsultarMeusComponent implements OnInit {

    
    paciente: Paciente[];



  constructor(private pacienteService: PacientesService) {
       
   }

  
  

  ngOnInit() {
    
    this.pacienteService.getAll().subscribe(
      paciente=> this.paciente = paciente
    );

      
		$(function () {
			$("#pacientesMeus").DataTable();
		});
  }

}
