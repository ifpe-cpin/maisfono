import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EvolucaoService } from '../../../services/evolucao.service';
import { Evolucao } from '../../../models/evolucao';

@Component({
  selector: 'app-paciente-evolucao',
  templateUrl: './paciente-evolucao.component.html',
  styleUrls: ['./paciente-evolucao.component.css'],
 	providers: [EvolucaoService],
   encapsulation: ViewEncapsulation.None
}) 
export class PacienteEvolucaoComponent implements OnInit {
  evolucoes: Evolucao[];
  editState: boolean = false;
  evolucaoToEdit: Evolucao;
  dataTable: any;
  

  constructor(private evolucaoService: EvolucaoService) {}
  
  ngOnInit() {
    this.evolucaoService.getEvolucaos().subscribe(evolucoes => {
      this.evolucoes = evolucoes;
    });
  }

  deleteEvolucao(event, evolucao) {
    const response = confirm('are you sure you want to delete?');
    if (response ) {
      this.evolucaoService.deleteEvolucao(evolucao);
    }
    return;
  }

  editEvolucao(event, evolucao) {
    this.editState = !this.editState;
    this.evolucaoToEdit = evolucao;
  }

  updateEvolucao(evolucao) {
    this.evolucaoService.updateEvolucao(evolucao);
    this.evolucaoToEdit = null;
    this.editState = false;
  }

}
