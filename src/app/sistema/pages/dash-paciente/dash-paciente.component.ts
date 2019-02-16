import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DashMarcacoesPacienteService } from '../../../services/dash-marcacoes-paciente.service';
import { Agenda } from '../../../models/agenda';
import { EvolucaoService } from '../../../services/evolucao.service';
import { Evolucao } from '../../../models/evolucao';
import { QueryOptions } from '../../../models/query-options';
import { DashMarcacoes } from '../../../models/dash-marcacoes';
//import { AgendaDashService } from '../../../services/agenda-dash.service';

@Component({
  selector: 'app-paciente-dash',
  templateUrl: './dash-paciente.component.html',
  styleUrls: ['./dash-paciente.component.css'],
  providers: [
      DashMarcacoesPacienteService,
      EvolucaoService
  ]
})
export class DashPacienteComponent implements OnInit {

  constructor(private dashMarcacoesPacienteService: DashMarcacoesPacienteService,
              private route: ActivatedRoute,
              private evolucaoService: EvolucaoService,
              private chRef: ChangeDetectorRef) { }


  dashMarcacoes: DashMarcacoes[];
  agenda: Agenda[];
  agendamentos: any[];
  loading:boolean;
  total_marcado: number;
  total_aguardando: number;
  total_atendido: number;
  total_faltou: number;
  evolucoes: Evolucao[]

  

  ngOnInit() {
        this.loading = true;
        this.refreshData();
  }


    refreshData(){

                let id = localStorage.getItem("pacienteId")
                this.dashMarcacoesPacienteService.listWithID(localStorage.getItem("pacienteId")).subscribe(
                    dashMarcacoes => {
                        this.dashMarcacoes = dashMarcacoes
                        this.total_marcado = this.dashMarcacoes[0].total_marcado;
                        this.total_aguardando = this.dashMarcacoes[0].total_aguardando;
                        this.total_atendido = this.dashMarcacoes[0].total_atendido;
                        this.total_faltou = this.dashMarcacoes[0].total_faltou;

                        this.chRef.detectChanges();
                        this.loading = false;
                    }
                );
            

    }


}
