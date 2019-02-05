import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DashMarcacoes } from '../../../models/dash-marcacoes';
import { DashMarcacoesService } from '../../../services/dash-marcacoes.service';

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css'],
    providers: [DashMarcacoesService]
})
export class DashComponent implements OnInit {

  constructor(private dashMarcacoesService: DashMarcacoesService,
              private route: ActivatedRoute,
              private chRef: ChangeDetectorRef){}

  marcacoes: DashMarcacoes[];
  loading:boolean;

  ngOnInit(){
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
            this.dashMarcacoesService.listWithID(id).subscribe(
                marcacoes => {
                    this.marcacoes = marcacoes
                    this.chRef.detectChanges();
                    this.loading = false;
                }
            );
        } 
    });
    }

}
