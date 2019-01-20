import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { ResourceServiceInterface } from '../../../../services/resource.service.interface';
import { Fonoaudiologo } from '../../../../models/fonoaudiologo';

declare var $:any;


import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FonoaudiologoService } from '../../../../services/fonoaudiologo.service';
import { QueryOptions } from '../../../../models/query-options';
import { ConfirmDialogComponent } from '../../../../confirm-dialog/confirm-dialog.component';
import { FonoaudiologoPaciente } from '../../../../models/fonoaudiologo-paciente';
import { FonoaudiologoPacienteService } from '../../../../services/fonoaudiologo-paciente.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-paciente-fono',
  templateUrl: './paciente-fono.component.html',
  styleUrls: ['./paciente-fono.component.css'],
  providers:[{provide: 'ResourceServiceInterface', useClass: FonoaudiologoPacienteService}]
})
export class PacienteFonoComponent implements OnInit {

  constructor(@Inject('ResourceServiceInterface') 
              private fonoPacienteService:ResourceServiceInterface<FonoaudiologoPaciente>,
  private router: Router,
  private chRef: ChangeDetectorRef,
  public dialog: MatDialog) { }


  fonos: FonoaudiologoPaciente[];
  dataTable: any;
  loading:boolean;
  pacienteId: string;

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
    this.pacienteId = localStorage.getItem("pacienteId")
    console.log(this.pacienteId)
    this.refreshData();
   }

   refreshData(){
     let queryMap = new Map<string,string>()
     queryMap.set("idPaciente",this.pacienteId)

     this.fonoPacienteService.list(new QueryOptions(queryMap)).
                subscribe( fonos => {
                  this.fonos = fonos
                  
                  this.chRef.detectChanges();

                  // Now you can use jQuery DataTables :
                  //let table: any = $('#fonoaudiologos');
                  if ( $.fn.dataTable.isDataTable( '#fonoaudiologos' ) ) {
                    this.dataTable = $('#fonoaudiologos').DataTable();
                }
                else {
                  this.dataTable = $('#fonoaudiologos').DataTable(
                        this.dataInfo
                     );
                }

                this.loading = false;
                  //this.dataTable = table.DataTable();
                });
  }

  createPage(){
    this.router.navigate(['/sistema/fonoaudiologo/novo']);
  }

  videoCall(idFono){
    this.router.navigate(['/sistema/video/play'],{ queryParams: { id: idFono }});
  }

}
