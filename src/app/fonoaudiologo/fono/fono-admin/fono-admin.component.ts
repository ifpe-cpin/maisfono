import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FonoaudiologoService } from '../../../services/fonoaudiologo.service';
import { Fono } from '../../../models/fono';
import { Router } from '@angular/router';

declare var $:any;


import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule } from "@angular/material";

@Component({
  selector: 'app-fono-admin',
  templateUrl: './fono-admin.component.html',
  styleUrls: ['./fono-admin.component.css'],
  providers:[FonoaudiologoService]
})
export class FonoAdminComponent implements OnInit {

  constructor(
    private fonoService:FonoaudiologoService,
    private router: Router,
    private chRef: ChangeDetectorRef) { }

  fonos: Fono[];
  dataTable: any;

  ngOnInit() {

   this.refreshData();
  }

  refreshData(){
    this.fonoService.getAll().
                subscribe( fonos => {
                  this.fonos = fonos
                  
                  this.chRef.detectChanges();

                  // Now you can use jQuery DataTables :
                  const table: any = $('#fonoaudiologos');
                  this.dataTable = table.DataTable({
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
                  });
                });
  }
  delete(fono:Fono){
    this.fonoService.delete(fono).then(
      result=>{
          console.log(result)
          this.refreshData();
    }
    ).catch(
      result=>console.log(result)
    );
    
  }

  createPage(){
    this.router.navigate(['/fonoaudiologo/fono/novo']);
  }

}
