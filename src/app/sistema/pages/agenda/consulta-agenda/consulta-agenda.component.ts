import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Agenda } from '../../../../models/agenda';
import { AgendaService } from '../../../../services/agenda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryOptions } from '../../../../models/query-options';

declare var $:any;

@Component({
  selector: 'app-consulta-agenda',
  templateUrl: './consulta-agenda.component.html',
  styleUrls: ['./consulta-agenda.component.css'],
  providers: [AgendaService]
})
export class ConsultaAgendaComponent implements OnInit {
  
  constructor(private agendaService:AgendaService,
              private router: Router,
              private route: ActivatedRoute,
              private chRef: ChangeDetectorRef) { }
 
  agenda: Agenda[];
  dataTable: any;
  loading:boolean;

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
    this.loading = true;
    this.refreshData();
  }

  refreshData(){

    this.route
		.queryParams
		.subscribe(params => {
			// Defaults to 0 if no query param provided.
      let id = localStorage.getItem('pessoaId');
            
			if(id!= undefined){
                this.agendaService.listWithID2(id).
                subscribe(agenda => {
                        this.agenda.push(agenda)

                        this.chRef.detectChanges();
                        
                        if ( $.fn.dataTable.isDataTable( '#agenda' ) ) {
                          this.dataTable = $('#agenda').DataTable();
                        }
                        else {
                            this.dataTable = $('#agenda').DataTable(
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
