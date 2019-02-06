import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef  } from '@angular/core';
import { EvolucaoService } from '../../../../services/evolucao.service';
import { Evolucao } from '../../../../models/evolucao';
import { ActivatedRoute } from '@angular/router';
import {  HttpClient } from '@angular/common/http'; 
import { QueryOptions } from '../../../../models/query-options';
import { FonoaudiologoPacienteService } from '../../../../services/fonoaudiologo-paciente.service';
import { Paciente } from '../../../../models/paciente';
import { PacienteService } from '../../../../services/paciente.service';


@Component({
  selector: 'app-paciente-evolucao',
  templateUrl: './paciente-evolucao.component.html',
  styleUrls: ['./paciente-evolucao.component.css'],
 	providers: [EvolucaoService,FonoaudiologoPacienteService,PacienteService]
}) 
export class PacienteEvolucaoComponent implements OnInit {

  evolucoes: Evolucao[]
  paciente: Paciente
  editState: boolean = false
  incluirVisible: boolean

  @ViewChild('modal_inclusao')
  modalInclusao: ElementRef


  @ViewChild('modal_edicao')
  modalEdicao: ElementRef

  
  time: Date
  idPaciente = this.route.snapshot.paramMap.get('id')
  
  fonoId: string;
  //Podendo usar somente uma para os dois casos.
  //Inicializa um evolução que servirá para edição
  evolucaoToEdit: Evolucao

  //Inicializa um evolução que servirá para inclusão 
  evolucao: Evolucao

  teste: Object
  
  loading:boolean
  constructor(private http: HttpClient, 
              private evolucaoService: EvolucaoService,
              private fonoPacienteService:FonoaudiologoPacienteService, 
              private pacienteService:PacienteService, 
              private route: ActivatedRoute,
              private chRef: ChangeDetectorRef) {  }
  
  ngOnInit() {
    this.evolucao = new Evolucao
    this.evolucaoToEdit = new Evolucao
    this.evolucao.fk_fonoaudiologo = +localStorage.getItem("fonoId")
    this.pacienteService.read(this.idPaciente).subscribe(
      paciente => this.paciente = paciente
    )

    this.refreshData()
  }

  onSubmit() {
    
    if(this.evolucao.dsc_evolucao != '' && this.evolucao.dsc_titulo != '' 
    && this.evolucao.fk_flag_evolucao > 0 && this.evolucao.fk_flag_evolucao < 4 ) {

      this.evolucaoService.create(this.evolucao).subscribe(
        result => {
          console.log(result)
          this.refreshData()
        }
        );
    }
    
  }

  editEvolucao(event, evolucao) {
    this.editState = !this.editState;
    this.evolucaoToEdit = evolucao;
  }

  refreshData(){
    this.loading = true

        this.evolucao.fk_paciente = +this.idPaciente
        
        if(this.evolucao.fk_paciente!= undefined && this.evolucao.fk_paciente+""!=""){
            this.incluirVisible = true
            let queryMap = new Map<string,string>()
            queryMap.set("idPaciente",this.evolucao.fk_paciente+"")
            queryMap.set("idFono",localStorage.getItem("fonoId"))

            this.evolucaoService.list(new QueryOptions(queryMap)).subscribe(
                evolucao => {
                    this.evolucoes = evolucao

                    this.chRef.detectChanges();
                    
                    this.loading = false;
                }
            );
        }else{
          this.incluirVisible = false
          this.evolucoes = []
         
        }
    }

  delete(id){
     const response = confirm('Tem certeza que quer deletar este registro?');
     if (response ) {
       this.evolucaoService.delete(id).subscribe(
         result => {
          console.log(result)
          this.refreshData()
         }
       )
     }
   }

  update(evolucaoToEdit){  
     this.evolucaoService.update(evolucaoToEdit).subscribe(
       result => {
         console.log(result)
         this.refreshData()
        }

     )
   }
   
}