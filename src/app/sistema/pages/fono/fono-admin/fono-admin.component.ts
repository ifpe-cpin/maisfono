import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FonoaudiologoService } from '../../../../services/fonoaudiologo.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../confirm-dialog/confirm-dialog.component';

declare var $:any;


import { MatDialog } from "@angular/material";
import { Fonoaudiologo } from '../../../../models/fonoaudiologo';
import { QueryOptions } from '../../../../models/query-options';
import { ResourceServiceInterface } from '../../../../services/resource.service.interface';

@Component({
  selector: 'app-fono-admin',
  templateUrl: './fono-admin.component.html',
  styleUrls: ['./fono-admin.component.css'],
  providers:[{provide: 'ResourceServiceInterface', useClass: FonoaudiologoService},]
})
export class FonoAdminComponent implements OnInit {

  constructor(
    @Inject('ResourceServiceInterface') private fonoService:ResourceServiceInterface<Fonoaudiologo>,
    private router: Router,
    private chRef: ChangeDetectorRef,
    public dialog: MatDialog) { }

  fonos: Fonoaudiologo[];
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
    this.fonoService.list(new QueryOptions).
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
  delete(fono:Fonoaudiologo){
    this.openDialog(fono);
    
  }

  createPage(){
    this.router.navigate(['/sistema/fonoaudiologo/novo']);
  }

  

  openDialog(fono:Fonoaudiologo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {msg: "Deseja realmente apagar esse registro?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){

        this.fonoService.delete(fono.id).subscribe(
          result=>{
              console.log(result)
              this.refreshData();
        }
        );

      }
    });
  }

}
