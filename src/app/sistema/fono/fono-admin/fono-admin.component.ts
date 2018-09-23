import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FonoaudiologoService } from '../../../services/fonoaudiologo.service';
import { Fono } from '../../../models/fono';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';

declare var $:any;


import { MatDialog } from "@angular/material";
import { Fonoaudiologo } from '../../../models/fonoaudiologo';

@Component({
  selector: 'app-fono-admin',
  templateUrl: './fono-admin.component.html',
  styleUrls: ['./fono-admin.component.css'],
  providers:[
    FonoaudiologoService,
  ]
})
export class FonoAdminComponent implements OnInit {

  constructor(
    private fonoService:FonoaudiologoService,
    private router: Router,
    private chRef: ChangeDetectorRef,
    public dialog: MatDialog) { }

  fonos: Fonoaudiologo[];
  dataTable: any;

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

   this.refreshData();
  }
  
  refreshData(){
    this.fonoService.getFonoaudiologos().
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


                  //this.dataTable = table.DataTable();
                });
  }
  delete(fono:Fono){
    this.openDialog(fono);
    
  }

  createPage(){
    this.router.navigate(['/sistema/fono/novo']);
  }


  openDialog(fono:Fono): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {msg: "Deseja realmente apagar esse registro?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){

        this.fonoService.deleteFonoaudiologo(fono).then(
          result=>{
              console.log(result)
              this.refreshData();
        }
        ).catch(
          result=>console.log(result)
        );

      }
    });
  }

}
