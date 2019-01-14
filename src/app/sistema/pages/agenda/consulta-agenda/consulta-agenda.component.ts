import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta-agenda',
  templateUrl: './consulta-agenda.component.html',
  styleUrls: ['./consulta-agenda.component.css']
})
export class ConsultaAgendaComponent implements OnInit {
  agenda: any[];
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getEventsCalendarRest().subscribe(data => {
      this.agenda = <any>data
      console.log(this.agenda);
    })
  }

  getEventsCalendarRest(){    
    let idFonoaudiologo = 2;//this.route.snapshot.paramMap.get('id');
    //passando como parametro o id do paciente e o id do fono
    return this.http.get('http://localhost/slim/public/fonoaudiologo/agenda/'+idFonoaudiologo)
  }

}
