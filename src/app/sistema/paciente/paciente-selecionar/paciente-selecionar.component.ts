import { OnInit, Component } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../models/paciente/paciente';

@Component({
    selector:'app-paciente-selecionar',
    templateUrl:'paciente-selecionar.component.html',
    styleUrls:[],
    providers:[PacienteService]
})
export class PacienteSelecionarComponent implements OnInit{

    listaPacientes: Paciente[];
    selectedPaciente: Paciente;

    constructor(private pacienteService: PacienteService){

    }
    ngOnInit(){
        this.listaPacientes = this.pacienteService.getPaciente();
    }

    select(paciente){
        this.selectedPaciente = paciente;
    }
}