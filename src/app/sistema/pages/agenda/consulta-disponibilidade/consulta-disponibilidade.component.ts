import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FonoaudiologoDisponibilidade } from '../../../../models/fonoaudiologoDisponibilidade';
import { FonoaudiologoDisponibilidadeService } from '../../../../services/fonoaudiologoDisponibilidade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaDisponibilidade } from '../../../../models/agenda-disponibilidade';
import { Paciente } from '../../../../models/paciente';
import { PacienteService } from '../../../../services/paciente.service';
import { FonoaudiologoPacienteService } from '../../../../services/fonoaudiologo-paciente.service';
import { Agenda } from '../../../../models/agenda';
import { FonoAgenda } from '../../../../models/fono-agenda';
import { FonoAgendaService } from '../../../../services/fono-agenda.service';
import { AgendaDisponibilidadeService } from '../../../../services/agenda-disponibilidade.service';
import { QueryOptions } from '../../../../models/query-options';

declare var $:any;

@Component({
  selector: 'app-consulta-disponibilidade',
  templateUrl: './consulta-disponibilidade.component.html',
  styleUrls: ['./consulta-disponibilidade.component.css'],
  providers: [AgendaDisponibilidadeService,
    PacienteService,
    FonoaudiologoPacienteService,
    FonoAgendaService]
})
export class ConsultaDisponibilidadeComponent implements OnInit {

  constructor(private agendaDisponibilidadeService:AgendaDisponibilidadeService,
              private route: ActivatedRoute,
              private router: Router,
              private fonoAgendaService:FonoAgendaService,
              private fonoPacienteService:FonoaudiologoPacienteService,
              private chRef: ChangeDetectorRef) { }

  agendaDisponibilidade: AgendaDisponibilidade[];
  dataTable: any;
  loading:boolean;

  disponibilidadeSelectedId: number
  pacienteSelectedId: number
  pacientes: Paciente[]
  


  dataInfo = {
      "language":{
          "sEmptyTable": "Nenhum registro encontrado",
          "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
          "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
          "sInfoFiltered": "(Filtrados de _MAX_ registros)",
          "sInfoPostFix": "",
          "sInfoThousands": ".",
          "sLengthMenu": "_MENU_ resultados por página",
          "sLoadingRecords": "Carregando...",
          "sProcessing": "Processando...",
          "sZeroRecords": "Nenhum registro encontrado",
          "sSearch": "Pesquisar",
          "oPaginate": {
              "sNext": "Próximo",
              "sPrevious": "Anterior",
              "sFirst": "Primeiro",
              "sLast": "Último"
          },
          "oAria": {
              "sSortAscending": ": Ordenar colunas de forma ascendente",
              "sSortDescending": ": Ordenar colunas de forma descendente"
          }
      }
  };
            
  ngOnInit() {

    let queryMap = new Map<string,string>()
    queryMap.set("idFono",localStorage.getItem("fonoId"))

    this.fonoPacienteService.list(new QueryOptions(queryMap)).subscribe(
      pacientes => {
        this.pacientes = pacientes
      }
    )

    this.loading = true;
    this.refreshData();
  }

  selectedDisponibilidade(event, disponibilidade){
        this.disponibilidadeSelectedId = disponibilidade.id
        console.log("SELECTED "+this.disponibilidadeSelectedId)
  }

  confirmExclusao(event, lista){

  }
  onSubmit(){
      let agenda = new FonoAgenda
      agenda.fk_agenda_disponibilidade = this.disponibilidadeSelectedId
      agenda.fk_fonoaudiologo = +localStorage.getItem('fonoId')
      agenda.fk_paciente = this.pacienteSelectedId
      agenda.fk_status = 5

      this.fonoAgendaService.create(agenda).subscribe(
          result=>{
              console.log(result)
          }
      )
  }
  refreshData(){
      this.route
      .queryParams
      .subscribe(params => {
          // Defaults to 0 if no query param provided.
              let id = localStorage.getItem('fonoId');
              
          if(id!= undefined){

                    let queryMap = new Map<string,string>()
                    queryMap.set("idFono",id)
                    this.agendaDisponibilidadeService.list(new QueryOptions(queryMap)).subscribe(
                        agendaDisponibilidade => {
                            this.agendaDisponibilidade = agendaDisponibilidade
                            console.log("Disponibilidade "+agendaDisponibilidade)

                            this.chRef.detectChanges();
                        
                            if ( $.fn.dataTable.isDataTable( '#consultaDisponibilidade' ) ) {
                            this.dataTable = $('#consultaDisponibilidade').DataTable();
                            }
                            else {
                                this.dataTable = $('#consultaDisponibilidade').DataTable(
                                    this.dataInfo 
                                );
                            }
                            
                            this.loading = false;
                            }
                    );
          } 
      });
  }

  

}
