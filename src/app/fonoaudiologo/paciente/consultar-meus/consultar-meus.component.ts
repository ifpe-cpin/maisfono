import { Component, OnInit } from '@angular/core';
// import { Lista } from '../lista-pacientes/lista.model';
import { Paciente } from '../../models/paciente/paciente';

import { PacienteFormComponent } from '../paciente-form/paciente-form.component';

import { PacienteService } from '../../../services/paciente.service';

declare var $:any;

@Component({
  selector: 'app-consultar-meus',
  templateUrl: './consultar-meus.component.html',
  styleUrls: ['./consultar-meus.component.css'],
  providers: [PacienteService]
})
export class ConsultarMeusComponent implements OnInit {

    
    paciente: Paciente;



  constructor(private pacienteService: PacienteService) {
       
   }

  
  

  ngOnInit() {
    
    this.paciente = this.pacienteService.getPaciente();

      
		$(function () {
			$("#pacientesMeus").DataTable();
		});
  }

}
