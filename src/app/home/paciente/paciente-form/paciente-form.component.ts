import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { PacienteService } from '../../../services/paciente.service';

import { Paciente } from '../../models/paciente/paciente';

import { ConsultarMeusComponent } from '../consultar-meus/consultar-meus.component';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css'],
  providers: [PacienteService]
})
export class PacienteFormComponent implements OnInit {

	paciente: Paciente;

  constructor(private router: Router, private pacienteService: PacienteService) {
  	this.paciente = new Paciente();
   }


   gravar(nome, telefone, email ){

   	let paciente = new Paciente(nome, telefone, email );
   	this.pacienteService.setPaciente(paciente);

   	this.router.navigate(['/home/paciente/consultarMeus']);

   	console.log(paciente);
   }


  ngOnInit() {
  }

}
