import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { PacienteService } from '../../../services/paciente.service';

import { Paciente } from '../../models/paciente/paciente';

import { ConsultarMeusComponent } from '../consultar-meus/consultar-meus.component';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css'],
  providers: [PacienteService]
})
export class PacienteFormComponent implements OnInit {

	paciente: Paciente;

  constructor(private router: Router,
     private pacienteService: PacienteService,
     public db: AngularFirestore) {
  	this.paciente = new Paciente(this.db);
   }


   gravar(nome, telefone, email ){

     let paciente = new Paciente(this.db);
     paciente.nome = nome;
     paciente.telefone = telefone;
     paciente.email = email;
     
   	this.pacienteService.setPaciente(paciente);

   	this.router.navigate(['/home/paciente/consultarMeus']);

   	console.log(paciente);
   }


  ngOnInit() {
  }

}
