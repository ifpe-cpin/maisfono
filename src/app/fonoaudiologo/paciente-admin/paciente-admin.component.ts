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

    this.pacientes = [
      {nome:"pires",telefone:"9999999",email:"j@gmail.com"},
      {nome:"pires",telefone:"9999999",email:"j@gmail.com"}
    ];

  }

}
