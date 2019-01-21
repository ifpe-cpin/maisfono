import { Component, OnInit } from '@angular/core';
import { FonoaudiologoDisponibilidade } from '../../../../models/fonoaudiologoDisponibilidade';
import { FonoaudiologoDisponibilidadeService } from '../../../../services/fonoaudiologoDisponibilidade.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-consulta-disponibilidade',
  templateUrl: './consulta-disponibilidade.component.html',
  styleUrls: ['./consulta-disponibilidade.component.css'],
  providers: [FonoaudiologoDisponibilidadeService]
})
export class ConsultaDisponibilidadeComponent implements OnInit {

  constructor(private fonoaudiologoDisponibilidadeService:FonoaudiologoDisponibilidadeService,
              private route: ActivatedRoute,
              private router: Router) { }

  fonoaudiologoDisponibilidade: FonoaudiologoDisponibilidade[];
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
                    this.fonoaudiologoDisponibilidadeService.listWithID(id).subscribe(
                        fonoaudiologoDisponibilidade => {
                            this.fonoaudiologoDisponibilidade = this.fonoaudiologoDisponibilidade
                        }
                    );
          } 
      });
  }

  

}
