declare var $:any;

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Agenda } from '../../../../models/agenda';
import { AgendaService } from '../../../../services/agenda.service';
import { QueryOptions } from '../../../../models/query-options';
import { environment } from '../../../../../environments/environment.prod';



@Component({
  selector: 'app-consulta-agenda',
  templateUrl: './consulta-agenda.component.html',
  styleUrls: ['./consulta-agenda.component.css'],
  providers: [AgendaService]
})
export class ConsultaAgendaComponent implements OnInit {
  
  constructor(private agendaService:AgendaService,
              private chRef: ChangeDetectorRef) { }
 
  agendas: Agenda[];
  dataTable: any;
  loading:boolean;


  ngOnInit() {
    this.loading = true;
    this.refreshData();
  }

  refreshData(){

			// Defaults to 0 if no query param provided.
      let id = localStorage.getItem('fonoId');
            
			if(id!= undefined){

        let queryMap = new Map<string,string>()
        queryMap.set("idFono",id)
                this.agendaService.list(new QueryOptions(queryMap)).
                subscribe(agendas => {

                        this.agendas = agendas;

                        this.chRef.detectChanges();

                        this.loading = false;
                        
                        if ( $.fn.dataTable.isDataTable( '#agenda' ) ) {
                          this.dataTable = $('#agenda').DataTable();
                        }
                        else {
                            this.dataTable = $('#agenda').DataTable(
                                environment.data_pt_info 
                            );
                        }
                        
                        
                    }
                );
            } 
        
  }


  changeStatus(agenda:Agenda,status:number){
      agenda.fk_status = status
      this.agendaService.update(agenda).subscribe(
        result => {
              console.log(result)
              this.refreshData()
        }
      )
  }

}
