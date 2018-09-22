import { Component, OnInit } from '@angular/core';

import { Paciente } from '../../models/paciente/paciente';

import { PacienteFormComponent } from '../paciente-form/paciente-form.component';

 import { PacientesService } from '../../../services/pacientes.service';


declare var $:any;

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [PacientesService]
})

export class ConsultaComponent implements OnInit {
 
  paciente: Paciente[];



  constructor(private pacienteService: PacientesService) {
  
     
   }

  
  

  ngOnInit() {
    
    this.pacienteService.getAll().subscribe(
      paciente=> this.paciente = paciente
    );
    
    $(function () {
			$("#pacientes").DataTable();
		});
  }

}
