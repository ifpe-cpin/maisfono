import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Paciente } from '../../../../models/paciente';
import { PacienteService } from '../../../../services/paciente.service';
import { Router } from '@angular/router';
import { QueryOptions } from '../../../../models/query-options';

declare var $:any;

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html', 
  styleUrls: ['./consulta.component.css'],
 	providers: [PacienteService]
}) 
export class ConsultaComponent implements OnInit {
    
  constructor(private pacienteService:PacienteService,
              private router: Router,
              private chRef: ChangeDetectorRef) {
 
  }
  
  pacientes: Paciente[];
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
    this.pacienteService.list(new QueryOptions()).
                subscribe( pacientes => {
                  this.pacientes = pacientes
                  
                  this.chRef.detectChanges();

                if ( $.fn.dataTable.isDataTable( '#pacientes' ) ) {
                    this.dataTable = $('#pacientes').DataTable();
                }
                else {
                  this.dataTable = $('#pacientes').DataTable(
                        this.dataInfo 
                     );
                }

                  this.loading = false;
                  //this.dataTable = table.DataTable();
                });
  }

}
