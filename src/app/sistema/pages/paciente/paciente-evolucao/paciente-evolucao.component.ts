import { Component, OnInit, ChangeDetectorRef, Input  } from '@angular/core';
import { EvolucaoService } from '../../../../services/evolucao.service';
import { Evolucao } from '../../../../models/evolucao';
import { ActivatedRoute } from '@angular/router';
import {  HttpClient } from '@angular/common/http'; 
import { QueryOptions } from '../../../../models/query-options';
import { FonoaudiologoPacienteService } from '../../../../services/fonoaudiologo-paciente.service';
import { Paciente } from '../../../../models/paciente';


@Component({
  selector: 'app-paciente-evolucao',
  templateUrl: './paciente-evolucao.component.html',
  styleUrls: ['./paciente-evolucao.component.css'],
 	providers: [EvolucaoService,FonoaudiologoPacienteService]
}) 
export class PacienteEvolucaoComponent implements OnInit {

  pacienteId: String

  evolucoes: Evolucao[]
  pacientes: Paciente[]
  editState: boolean = false

  
  time: Date
  idPaciente = this.route.snapshot.paramMap.get('id')
  
  fonoId: string;
  //Podendo usar somente uma para os dois casos.
  //Inicializa um evolução que servirá para edição
  evolucaoToEdit: Evolucao= {
    id: 0,
    dsc_evolucao: '',
    dsc_titulo: '',
    fk_flag_evolucao: 0
   };

  //Inicializa um evolução que servirá para inclusão 
  evolucao: Evolucao

  teste: Object
  
  loading:boolean
  constructor(private http: HttpClient, 
              private evolucaoService: EvolucaoService,
              private fonoPacienteService:FonoaudiologoPacienteService, 
              private route: ActivatedRoute,
              private chRef: ChangeDetectorRef) {  }
  
  ngOnInit() {
    this.evolucao = new Evolucao
    this.fonoId = localStorage.getItem("fonoId")

 
    console.log("FONO "+this.fonoId)

    let queryMap = new Map<string,string>()
    queryMap.set("idFono",localStorage.getItem("fonoId"))

    this.fonoPacienteService.list(new QueryOptions(queryMap)).subscribe(
      pacientes => {
        this.pacientes = pacientes
      }
    )
    //this.loading = true
    //this.refreshData()
    /*
    this.evolucao = new Evolucao();
    this.evolucao.fk_flag_evolucao = 1
    this.evolucaoService.list(new QueryOptions).subscribe(data => {
      this.evolucoes = <any>data
    })
    */
  }

  onSubmit() {
    /*
    console.log(this.evolucao)
    if(this.evolucao.dsc_evolucao != '' && this.evolucao.dsc_titulo != '' 
    && this.evolucao.fk_flag_evolucao > 0 && this.evolucao.fk_flag_evolucao < 4 ) {
      this.evolucao.fk_fonoaudiologo = 2;
      this.evolucao.fk_paciente = 1;

      this.evolucaoService.create(this.evolucao).subscribe(
        result => {
          console.log(result)
        }
        );;
    }
    */
  }

  editEvolucao(event, evolucao) {
    this.editState = !this.editState;
    this.evolucaoToEdit = evolucao;
  }

  refreshData(){
    this.route
    .queryParams
    .subscribe(params => {
        // Defaults to 0 if no query param provided.
        let id = localStorage.getItem('pessoaId');
            
        if(id!= undefined){
            this.evolucaoService.listWithTwoID(this.idPaciente, id).subscribe(
                evolucao => {
                    this.evolucoes = evolucao

                    this.chRef.detectChanges();
                    
                    this.loading = false;
                }
            );
        } 
    });

    }

    
    
   /* 
  setEvolucaoRest(evolucao){
    //passando como parametro o id do paciente e o id do fono  
    evolucao.fk_paciente = this.idPaciente;
    evolucao = JSON.stringify(evolucao);

     return this.http.post('http://localhost/slim/public/evolucao/create', evolucao)
     .subscribe(res => console.log("done"));

  }

  delEvolucaoRest(id){
     const response = confirm('Tem certeza que quer deletar este registro?');
     if (response ) {
       return this.http.delete('http://localhost/slim/public/evolucao/delete/'+id)
       .subscribe(res => console.log('Done'));
     }
     return;
   }

  updEvolucaoRest(evolucaoToEdit, id){
    //passando como parametro o evolução e o id da evolução    
    evolucaoToEdit = JSON.stringify(evolucaoToEdit);

     return this.http.put('http://localhost/slim/public/evolucao/update/'+id, evolucaoToEdit)
     .subscribe(res => console.log("done"));

   }
   */
}