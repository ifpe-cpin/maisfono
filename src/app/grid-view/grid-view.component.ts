import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {

  private _data: any[];

  @Input() title: string;

  @Input() urlCreate: string;
  @Input() urlView: string;
  @Input() urlUpdate: string;
  @Input() fields: string[];



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


  @Input()
  set data( data: any[]) {
    
    this._data = data;

    this.chRef.detectChanges();

                  // Now you can use jQuery DataTables :
                  //let table: any = $('#fonoaudiologos');
                  if ( $.fn.dataTable.isDataTable( '#grid' ) ) {
                    this.dataTable = $('#grid').DataTable();
                }
                else {
                  this.dataTable = $('#grid').DataTable(
                        //this.dataInfo
                     );
                }
  }

  get data(): any[] {
    // transform value for display
    return this._data;
  }


  dataTable: any;

  



  constructor(
    private router: Router,
    private chRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
  }

  createPage(){
    this.router.navigate([this.urlCreate]);
  }

}
