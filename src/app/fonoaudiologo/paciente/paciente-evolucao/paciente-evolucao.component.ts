import { Component, OnInit } from '@angular/core';
import { Evolucao } from "../../models/paciente/evolucao";

@Component({
  selector: 'app-paciente-evolucao',
  templateUrl: './paciente-evolucao.component.html',
  styleUrls: ['./paciente-evolucao.component.css']
})
export class PacienteEvolucaoComponent implements OnInit {
  selectedEvolucao: Evolucao;
  evolucao: Evolucao[] = [];
  title: String;

  constructor() { }

  ngOnInit() {
    this.evolucao.push(
      new Evolucao('Título','descricao 1', '12:00', '22 Set. 2017', 2),
      new Evolucao('Título','descricao 2', '12:03', '15 Set. 2017', 3),
      new Evolucao('Título','descricao 3', '12:10', '08 Set. 2017', 2),
      new Evolucao('Título','descricao 4', '12:01', '01 Set. 2017', 1)
    );    
    
    this.selectedEvolucao = {titulo: '', descricao: '', hora: '', data: '', tipoEvolucao: 1};
  }


  adicionaEvolucao(titulo, descricao, hora, data, tipoEvolucao){  
      let evolucao = new Evolucao(titulo, descricao, hora, data, tipoEvolucao);
      this.evolucao.push(evolucao);
  }  
  
  deletarEvolucao(id){  
      this.evolucao.splice(id, 1);
  }

  selecionaEvolucao(evolucao: Evolucao) {
    this.selectedEvolucao = evolucao;
    //this.title = this.selectedEvolucao.titulo;
  }
}
