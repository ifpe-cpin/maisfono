import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { PacientesService } from '../../../services/pacientes.service';
import { Paciente } from '../../models/paciente/paciente';

import { ConsultarMeusComponent } from '../consultar-meus/consultar-meus.component';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css'],
  providers: [PacientesService]
})
export class PacienteFormComponent implements OnInit {

	paciente: Paciente;

  constructor(private router: Router,
     private pacienteService: PacientesService,
     public db: AngularFirestore) {
  	this.paciente = new Paciente(this.db);
   }


   gravar(nome, telefone, email ){

     let paciente = new Paciente(this.db);
     paciente.nome = nome;
     paciente.telefone = telefone;
     paciente.email = email;
     
   	this.pacienteService.add(paciente);

   	this.router.navigate(['/home/paciente/consultarMeus']);

   	console.log(paciente);
   }


  ngOnInit() {
  }

}
