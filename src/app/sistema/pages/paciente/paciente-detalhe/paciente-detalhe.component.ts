import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../../../services/paciente.service';
import { Paciente } from '../../../../models/paciente';
import { ResourceServiceInterface } from '../../../../services/resource.service.interface';

@Component({
  selector: 'app-paciente-detalhe',
  templateUrl: './paciente-detalhe.component.html',
  styleUrls: ['./paciente-detalhe.component.css'],
  providers:[{provide: 'ResourceServiceInterface', useClass: PacienteService}] 
})
export class PacienteDetalheComponent implements OnInit {

  paciente: Paciente;

  constructor( private route: ActivatedRoute,
    @Inject('ResourceServiceInterface') private pacienteService:ResourceServiceInterface<Paciente>) { }

    ngOnInit() {
    
      this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        let id = params['id'];
  
        if(id!= undefined){
            this.pacienteService.read(id).subscribe(
              paciente => {
                console.log(paciente)
                this.paciente = paciente
              }
            );
        }
  
        
      });
      
    }
  
  }