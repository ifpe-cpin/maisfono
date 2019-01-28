import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Paciente } from '../../../../models/paciente';
import { PacienteService } from '../../../../services/paciente.service';
import { Router } from '@angular/router';
import { QueryOptions } from '../../../../models/query-options';
import { ConfirmDialogComponent } from '../../../../confirm-dialog/confirm-dialog.component';

import { MatDialog } from "@angular/material";
import { ResourceServiceInterface } from '../../../../services/resource.service.interface';

declare var $:any;

@Component({
  selector: 'app-consultar-meus',
  templateUrl: './consultar-meus.component.html',
  styleUrls: ['./consultar-meus.component.css'],
 	providers: [{provide: 'ResourceServiceInterface', useClass: PacienteService},]
}) 

export class ConsultarMeusComponent implements OnInit {
     
  constructor(@Inject('ResourceServiceInterface') private pacienteService:ResourceServiceInterface<Paciente>,
  private router: Router,
  private chRef: ChangeDetectorRef,
  public dialog: MatDialog) {

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

delete(paciente:Paciente){
  this.openDialog(paciente);
  
}

createPage(){
  this.router.navigate(['/sistema/paciente/novo']);
}



openDialog(paciente:Paciente): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: {msg: "Deseja realmente apagar esse registro?"}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result){

      this.pacienteService.delete(paciente.id).subscribe(
        result=>{
            console.log(result)
            this.refreshData();
      }
      );

    }
  });
}

}
