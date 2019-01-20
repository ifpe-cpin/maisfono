import { Component, OnInit,ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { PacienteService } from '../../../../services/paciente.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var $:any;


import { MatDialog } from "@angular/material";
import { Paciente } from '../../../../models/paciente';
import { QueryOptions } from '../../../../models/query-options';
import { ResourceServiceInterface } from '../../../../services/resource.service.interface';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html', 
  styleUrls: ['./consulta.component.css'],
  providers:[{provide: 'ResourceServiceInterface', useClass: PacienteService},]
 	// providers: [PacienteService],
  //  encapsulation: ViewEncapsulation.None
})
export class ConsultaComponent implements OnInit {
  PacienteService: any;
  http: any;

  

  constructor(
    @Inject('ResourceServiceInterface') private pacienteService:ResourceServiceInterface<Paciente>,
    private router: Router,
    private chRef: ChangeDetectorRef,
    public dialog: MatDialog) { }

    pacientes: Paciente[];
    // editState: boolean = false;
    pacienteToEdit: Paciente;
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
    this.pacienteService.list(new QueryOptions).
                subscribe( pacientes => {
                  this.pacientes = pacientes
                  
                  this.chRef.detectChanges();

                  if ( $.fn.dataTable.isDataTable( '#paciente' ) ) {
                    this.dataTable = $('#paciente').DataTable();
                }
                else {
                  this.dataTable = $('#paciente').DataTable(
                        this.dataInfo
                     );
                }

                this.loading = false;
                  //this.dataTable = table.DataTable();
                });

                console.log("vai?");
  }


  getEvolucoesRest(){    
    //passando como parametro o id do paciente e o id do fono
    return this.http.get('http://localhost/slim/public/paciente/pacientes')
  }

}