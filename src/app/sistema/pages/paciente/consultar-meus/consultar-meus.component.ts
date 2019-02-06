import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FonoaudiologoPacienteService } from '../../../../services/fonoaudiologo-paciente.service';
import { Paciente } from "../../../../models/paciente";
import { QueryOptions } from '../../../../models/query-options';
import { ActivatedRoute, Router } from '@angular/router';

declare var $:any;

@Component({
    selector: 'app-consultar-meus',
    templateUrl: './consultar-meus.component.html',
    styleUrls: ['./consultar-meus.component.css'],
    providers: [FonoaudiologoPacienteService]
}) 

export class ConsultarMeusComponent implements OnInit {

    constructor(private fonoaudiologoPacienteService: FonoaudiologoPacienteService,
                private route: ActivatedRoute,
                private chRef: ChangeDetectorRef) {}
  

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
    this.route
    .queryParams
    .subscribe(params => {
        // Defaults to 0 if no query param provided.
           // let id = localStorage.getItem('pessoaId');
            
       //if(id!= undefined){

            let queryMap = new Map<string,string>()

            queryMap.set("idFono",localStorage.getItem("fonoId"))

            this.fonoaudiologoPacienteService.list(new QueryOptions(queryMap)).subscribe(
                pacientes => {
                    this.pacientes = pacientes

                    this.chRef.detectChanges();
                
                    if ( $.fn.dataTable.isDataTable( '#meusPacientes' ) ) {
                    this.dataTable = $('#meusPacientes').DataTable();
                    }
                    else {
                        this.dataTable = $('#meusPacientes').DataTable(
                            this.dataInfo 
                        );
                    }
                    
                    this.loading = false;
                }
            );
        //} 
    });
    }


}