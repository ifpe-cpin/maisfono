import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import {  HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-consultar-meus',
  templateUrl: './consultar-meus.component.html',
  styleUrls: ['./consultar-meus.component.css'],
 	providers: [PacienteService],
   encapsulation: ViewEncapsulation.None
}) 

export class ConsultarMeusComponent implements OnInit {
  pacientes: Paciente[];
  editState: boolean = false;
  pacienteToEdit: Paciente;
  dataTable: any;
  

  constructor(private http: HttpClient, private pacienteService: PacienteService) {}
  
  ngOnInit() {
    this.getPacientesRest().subscribe(data => {
      this.pacientes = <any>data;
      console.log(this.pacientes);
    });
  }

  
  getPacientesRest(){
    //passando como parametro o id do paciente e o id do fono
    return this.http.get('http://localhost/slim/public/paciente/pacientes')
  }
}
