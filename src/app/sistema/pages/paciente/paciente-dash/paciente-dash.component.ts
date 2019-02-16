import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashMarcacoes } from '../../../../models/dash-marcacoes';
import { DashMarcacoesPacienteService } from '../../../../services/dash-marcacoes-paciente.service';
import { Agenda } from '../../../../models/agenda';
import { EvolucaoService } from '../../../../services/evolucao.service';
import { Evolucao } from '../../../../models/evolucao';
import { QueryOptions } from '../../../../models/query-options';
//import { AgendaDashService } from '../../../services/agenda-dash.service';

@Component({
  selector: 'app-paciente-dash',
  templateUrl: './paciente-dash.component.html',
  styleUrls: ['./paciente-dash.component.css'],
  providers: [
      DashMarcacoesPacienteService,
      EvolucaoService
  ]
})
export class PacienteDashComponent implements OnInit {

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

  idPaciente = this.route.snapshot.paramMap.get('id')

  ngOnInit() {
        this.loading = true;
        this.refreshData();
        this.refreshDataEvolucao()
  }


    refreshData(){
        this.route
        .queryParams
        .subscribe(params => {
            // Defaults to 0 if no query param provided.
            let id = localStorage.getItem('fonoId');
                
            if(id!= undefined){
                this.dashMarcacoesPacienteService.listWithTwoID(id, this.idPaciente).subscribe(
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
        }); 
    }

    
    refreshDataEvolucao(){
        this.loading = true
        let queryMap = new Map<string,string>()
        queryMap.set("idPaciente",this.idPaciente+"")
        queryMap.set("idFono",localStorage.getItem("fonoId"))

        this.evolucaoService.list(new QueryOptions(queryMap)).subscribe(
            evolucao => {
                this.evolucoes = evolucao

                this.chRef.detectChanges();
                
                this.loading = false;
            }
        );
       
    }


}
