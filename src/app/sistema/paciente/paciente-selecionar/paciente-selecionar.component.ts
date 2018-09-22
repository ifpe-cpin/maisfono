import { OnInit, Component } from '@angular/core';
import { PacientesService } from '../../../services/pacientes.service';
import { Paciente } from '../../models/paciente/paciente';

@Component({
    selector:'app-paciente-selecionar',
    templateUrl:'paciente-selecionar.component.html',
    styleUrls:[],
    providers:[PacientesService]
})
export class PacienteSelecionarComponent implements OnInit{

    listaPacientes: Paciente[];
    selectedPaciente: Paciente;

    constructor(private pacienteService: PacientesService){

    }
    ngOnInit(){
          this.pacienteService.getAll().subscribe(
            paciente=> this.listaPacientes = paciente
          );
    }

    select(paciente){
        this.selectedPaciente = paciente;
    }
}