import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { QueryOptions } from '../../../models/query-options';
import { ResourceServiceInterface } from '../../../services/resource.service.interface';

@Component({
  selector: 'app-paciente-selecionar',
  templateUrl: './paciente-selecionar.component.html',
 	providers: [{provide: 'ResourceServiceInterface', useClass: PacienteService}],
   encapsulation: ViewEncapsulation.None
}) 
export class PacienteSelecionarComponent implements OnInit {
  pacientes: Paciente[];
  editState: boolean = false;
  pacienteToEdit: Paciente;
  dataTable: any;
  

  constructor(@Inject('ResourceServiceInterface') private pacienteService: ResourceServiceInterface<Paciente>) {}
  
  ngOnInit() {
    this.pacienteService.list(new QueryOptions).subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  deletePaciente(event, paciente) {
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
