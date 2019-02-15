import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashMarcacoes } from '../../../models/dash-marcacoes';
import { DashMarcacoesService } from '../../../services/dash-marcacoes.service';
import { Agenda } from '../../../models/agenda';
import { AgendaDashService } from '../../../services/agenda-dash.service';

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css'],
    providers: [
        DashMarcacoesService,
        AgendaDashService
    ]
})
export class DashComponent implements OnInit {
    

  constructor(private dashMarcacoesService: DashMarcacoesService,
              private agendaService: AgendaDashService,
              private route: ActivatedRoute,
              private chRef: ChangeDetectorRef){}

    dashMarcacoes: DashMarcacoes[];
    agenda: Agenda[];
    agendamentos: any[];
    loading:boolean;
    total_marcado: number;
    total_aguardando: number;
    total_atendido: number;
    total_faltou: number;

    ngOnInit(){
        this.loading = true;
        this.refreshData();
        this.refreshDataAgenda();
    }
  
    refreshData(){
        this.route
        .queryParams
        .subscribe(params => {
            // Defaults to 0 if no query param provided.
                let id = localStorage.getItem('pessoaId');
                
            if(id!= undefined){
                this.dashMarcacoesService.listWithID(id).subscribe(
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
  
    refreshDataAgenda(){
        this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                let id = localStorage.getItem('pessoaId');
                
                if(id!= undefined){
                    this.agendaService.listWithID(id).
                    subscribe(agenda => {
                            this.agenda = agenda;
                            console.log(this.agenda);
                            this.chRef.detectChanges();
                            
                            this.loading = false;
                        }
                    );
                } 
            });
    }

}
