import { Component, OnInit } from '@angular/core';
import { Paciente } from '../models/paciente/paciente';

@Component({
  selector: 'app-paciente-admin',
  templateUrl: './paciente-admin.component.html',
  styleUrls: ['./paciente-admin.component.css']
})
export class PacienteAdminComponent implements OnInit {


  pacientes: Paciente[];

  constructor() { }

  ngOnInit() {

    let p1 = new Paciente("Pires","9876541","pires@gmail.com");
    let p2 = new Paciente("João","9876541","pires@gmail.com");

    this.pacientes = [
      p1,p2
    ];

  }

  delete(paciente:Paciente){
    console.log(paciente.nome);
    
  }

}
