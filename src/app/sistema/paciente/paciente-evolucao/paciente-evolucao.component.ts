import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EvolucaoService } from '../../../services/evolucao.service';
import { Evolucao } from '../../../models/evolucao';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';



@Component({
  selector: 'app-paciente-evolucao',
  templateUrl: './paciente-evolucao.component.html',
  styleUrls: ['./paciente-evolucao.component.css'],
 	providers: [EvolucaoService],
   encapsulation: ViewEncapsulation.None
}) 
export class PacienteEvolucaoComponent implements OnInit {
  evolucoes: Evolucao[];
  editState: boolean = false;
  pacienteId: String;
  time: Date;
  /*
    Alterar
    Pegar id do fono no login e setar como global
  */
  fonoadiologoId: "8u1i3tA5R0Gvp4FB91S";
  //Podendo usar somente uma para os dois casos.
  //Inicializa um evolução que servirá para edição
  evolucaoToEdit: Evolucao= {
    dsc_evolucao: '',
    dsc_titulo: '',
    num_status: 0,
    dat_evolucao: this.getTimestamp()
   };

  //Inicializa um evolução que servirá para inclusão 
  evolucao: Evolucao = {
    dsc_evolucao: '',
    dsc_titulo: '',
    num_status: 0,
    dat_evolucao: this.getTimestamp()
   };

   
  constructor(private evolucaoService: EvolucaoService, private route: ActivatedRoute) {  }
  
  ngOnInit() {
    
    this.pacienteId = this.route.snapshot.paramMap.get('id');
    
    //console.log(idFonoaudiologo)

    this.evolucaoService.getEvolucoes().subscribe(evolucoes => {
      this.evolucoes = evolucoes;
      console.log(this.evolucoes);
    });
  }


  onSubmit() {
    this.evolucao.dat_evolucao = this.getTimestamp();
    if(this.evolucao.dsc_evolucao != '' && this.evolucao.dsc_titulo != '' 
    && this.evolucao.num_status > -2 && this.evolucao.num_status < 2 ) {
      this.evolucaoService.addEvolucao(this.evolucao);
      this.evolucao.dsc_evolucao = '';
      this.evolucao.dsc_titulo = '';
      this.evolucao.dat_evolucao = '';
      //this.evolucao.num_status = 0;
    }
  }

  deleteEvolucao(event, evolucao) {
    const response = confirm('are you sure you want to delete?');
    if (response ) {
      this.evolucaoService.deleteEvolucao(evolucao);
    }
    return;
  }

  editEvolucao(event, evolucao) {
    console.log("entrou")
    this.editState = !this.editState;
    this.evolucaoToEdit = evolucao;
  }

  updateEvolucao(evolucao) {
    this.evolucaoService.updateEvolucao(evolucao);
    this.evolucaoToEdit = {
      dsc_evolucao: '',
      dsc_titulo: '',
      num_status: 0,
      dat_evolucao: this.getTimestamp()
     };
    //this.editState = false;
  }


  getTimestamp(){
    let time = firebase.firestore.Timestamp.now();

    return time
  }

}
