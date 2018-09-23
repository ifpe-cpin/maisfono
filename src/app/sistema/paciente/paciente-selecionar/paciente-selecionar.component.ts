import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';

@Component({
  selector: 'app-paciente-selecionar',
  templateUrl: './paciente-selecionar.component.html',
 	providers: [PacienteService],
   encapsulation: ViewEncapsulation.None
}) 
export class PacienteSelecionarComponent implements OnInit {
  pacientes: Paciente[];
  editState: boolean = false;
  pacienteToEdit: Paciente;
  dataTable: any;
  

  constructor(private pacienteService: PacienteService) {}
  
  ngOnInit() {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  deletePaciente(event, paciente) {
    const response = confirm('are you sure you want to delete?');
    if (response ) {
      this.pacienteService.deletePaciente(paciente);
    }
    return;
  }

  editPaciente(event, paciente) {
    this.editState = !this.editState;
    this.pacienteToEdit = paciente;
  }

  updatePaciente(paciente) {
    this.pacienteService.updatePaciente(paciente);
    this.pacienteToEdit = null;
    this.editState = false;
  }

}
