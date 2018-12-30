import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { QueryOptions } from '../../../models/query-options';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css'],
 	providers: [PacienteService],
   encapsulation: ViewEncapsulation.None
}) 
export class PacienteFormComponent implements OnInit {
  pacientes: Paciente[];
  editState: boolean = false;
  pacienteToEdit: Paciente;
  dataTable: any;
  

  constructor(private pacienteService: PacienteService) {}
  
  ngOnInit() {
    this.pacienteService.list(new QueryOptions).subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  deletePaciente(event, paciente: Paciente) {
    const response = confirm('are you sure you want to delete?');
    if (response ) {
      this.pacienteService.delete(paciente.id);
    }
    return;
  }

  editPaciente(event, paciente) {
    this.editState = !this.editState;
    this.pacienteToEdit = paciente;
  }

  updatePaciente(paciente) {
    this.pacienteService.update(paciente);
    this.pacienteToEdit = null;
    this.editState = false;
  }

}
