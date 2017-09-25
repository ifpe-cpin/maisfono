import { Component, OnInit } from '@angular/core';
import { Evolucao } from "../../models/paciente/evolucao";

@Component({
  selector: 'app-paciente-evolucao',
  templateUrl: './paciente-evolucao.component.html',
  styleUrls: ['./paciente-evolucao.component.css']
})
export class PacienteEvolucaoComponent implements OnInit {
  evolucao: Evolucao[] = [];

  
  

  constructor() { }

  ngOnInit() {
    this.populaEvolucao();
  }


  populaEvolucao(){
    //tipoEvolucao (1 - Regrediu, 2 - Não apresentou evolução e não regrediu, 3 - Evoluiu)
    this.evolucao.push(
      new Evolucao('Título','descricao', '12:00', '22 Set. 2017', 2),
      new Evolucao('Título','descricao', '12:03', '15 Set. 2017', 3),
      new Evolucao('Título','descricao', '12:10', '08 Set. 2017', 2),
      new Evolucao('Título','descricao', '12:01', '01 Set. 2017', 1)
    );
  }

  adicionaEvolucao(titulo, descricao, hora, data, tipoEvolucao){  
      let evolucao = new Evolucao(titulo, descricao, hora, data, tipoEvolucao);
      this.evolucao.push(evolucao);
  }  
  
  deletarEvolucao(id){  
      this.evolucao.splice(id, 1);
  }
}
