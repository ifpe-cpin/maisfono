import { Component, OnInit } from '@angular/core';

import { Paciente } from '../../models/paciente/paciente';

import { PacienteFormComponent } from '../paciente-form/paciente-form.component';

import { PacienteService } from '../../../services/paciente.service';

declare var $:any;

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [PacienteService]
})

export class ConsultaComponent implements OnInit {
 
  paciente: Paciente;



  constructor(private pacienteService: PacienteService) {
  
     
   }

  
  

  ngOnInit() {
    
    this.paciente = this.pacienteService.getPaciente();
    
    $(function () {
			$("#pacientes").DataTable();
		});
  }

}
