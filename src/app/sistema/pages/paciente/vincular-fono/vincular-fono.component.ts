import { Component, OnInit, Inject, ChangeDetectorRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { Fonoaudiologo } from '../../../../models/fonoaudiologo';
import { ResourceServiceInterface } from '../../../../services/resource.service.interface';
import { FonoaudiologoService } from '../../../../services/fonoaudiologo.service';
import { Router } from '@angular/router';
import { QueryOptions } from '../../../../models/query-options';
import { FonoaudiologoPacienteService } from '../../../../services/fonoaudiologo-paciente.service';
import { FonoaudiologoPaciente } from '../../../../models/fonoaudiologo-paciente';

declare var $:any;

@Component({
  selector: 'app-vincular-fono',
  templateUrl: './vincular-fono.component.html',
  styleUrls: ['./vincular-fono.component.css'],
  providers:[FonoaudiologoPacienteService,
    {provide: 'ResourceServiceInterface', useClass: FonoaudiologoService}]
})
export class VincularFonoComponent implements OnInit,OnChanges {

  constructor(@Inject('ResourceServiceInterface') 
  private fonoService:ResourceServiceInterface<Fonoaudiologo>,
  private fonoPacienteService:FonoaudiologoPacienteService,
  private router: Router,
  private chRef: ChangeDetectorRef) { }

@Output()
changeData: EventEmitter<String> = new EventEmitter<String>();

fonos: Fonoaudiologo[];
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

ngOnChanges(){
  this.pacienteId = localStorage.getItem("pacienteId")
}


ngOnInit() {
this.loading = true;

this.refreshData();
}

refreshData(){
let queryMap = new Map<string,string>()
queryMap.set("notIdPaciente",this.pacienteId)

this.fonoService.list(new QueryOptions(queryMap)).
    subscribe( fonos => {
      this.fonos = fonos
      console.log(fonos)
      this.chRef.detectChanges();

      // Now you can use jQuery DataTables :
      //let table: any = $('#fonoaudiologos');
      if ( $.fn.dataTable.isDataTable( '#vincular' ) ) {
        this.dataTable = $('#vincular').DataTable();
    }
    else {
      this.dataTable = $('#vincular').DataTable(
            this.dataInfo
         );
    }

    this.loading = false;
    });
}



vincular(idFono: number){

  let fonoPaciente = new FonoaudiologoPaciente()
  fonoPaciente.frg_fonoaudiologo = idFono
  fonoPaciente.frg_paciente = localStorage.getItem("pacienteId")
  fonoPaciente.flag_situacao = 1

  this.fonoPacienteService.create(fonoPaciente).subscribe(
    fonoPaciente => {
      this.refreshData()
      this.changeData.emit("change")
    }
  )


}


}
