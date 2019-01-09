import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta-disponibilidade',
  templateUrl: './consulta-disponibilidade.component.html',
  styleUrls: ['./consulta-disponibilidade.component.css']
})
export class ConsultaDisponibilidadeComponent implements OnInit {
  disponibilidade: any[];

  disponibilidadeToConfirm = {
    id: 0,
    data: '',
    hora_inicio: '',
    hora_fim: ''
   };

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getEventsCalendarRest().subscribe(data => {
      this.disponibilidade = <any>data
      console.log(this.disponibilidade);
    })
  }

  getEventsCalendarRest(){    
    let idFonoaudiologo = 2;//this.route.snapshot.paramMap.get('id');
    //passando como parametro o id do paciente e o id do fono
    return this.http.get('http://localhost/slim/public/fonoaudiologo/disponibilidade/'+idFonoaudiologo)
  }


  confirmExclusao(event, lista) {
    this.disponibilidadeToConfirm = lista;
  }

}
