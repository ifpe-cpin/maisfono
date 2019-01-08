import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  marcacoes: any[];
  totalAtendidos: 0;
  totalFaltaram: 0;
  totalAguardando: 0;
  totalMarcados: 0;

  constructor(private http: HttpClient, private route: ActivatedRoute){}

  ngOnInit(){
    this.getAgendaRest().subscribe(data => {
      this.marcacoes = <any>data
    })
    

    this.getSumAtendidosRest().subscribe(data => {
      this.totalAtendidos = <any>data
    })
    this.getSumFaltaramRest().subscribe(data => {
      this.totalFaltaram = <any>data
    })
    this.getSumAguardandoRest().subscribe(data => {
      this.totalAguardando = <any>data
    })
    this.getSumMarcadosRest().subscribe(data => {
      this.totalMarcados = <any>data
    })



  }


  getAgendaRest(){    
    let idFonoaudiologo = 2;//this.route.snapshot.paramMap.get('id');
    //passando como parametro o id do paciente e o id do fono
    return this.http.get('http://localhost/slim/public/dashboard/agenda/'+idFonoaudiologo)
  }

  getSumAtendidosRest(){    
    let idFonoaudiologo = 2;//this.route.snapshot.paramMap.get('id');
    //passando como parametro o id do paciente e o id do fono
    return this.http.get('http://localhost/slim/public/dashboard/atendidos/'+idFonoaudiologo)
  }

  getSumFaltaramRest(){    
    let idFonoaudiologo = 2;//this.route.snapshot.paramMap.get('id');
    //passando como parametro o id do paciente e o id do fono
    return this.http.get('http://localhost/slim/public/dashboard/faltaram/'+idFonoaudiologo)
  }

  getSumAguardandoRest(){    
    let idFonoaudiologo = 2;//this.route.snapshot.paramMap.get('id');
    //passando como parametro o id do paciente e o id do fono
    return this.http.get('http://localhost/slim/public/dashboard/aguardando/'+idFonoaudiologo)
  }

  getSumMarcadosRest(){    
    let idFonoaudiologo = 2;//this.route.snapshot.paramMap.get('id');
    //passando como parametro o id do paciente e o id do fono
    return this.http.get('http://localhost/slim/public/dashboard/marcados/'+idFonoaudiologo)
  }


}
