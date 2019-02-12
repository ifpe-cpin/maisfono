import { Component, OnInit } from '@angular/core';
import { FonoaudiologoDisponibilidade } from '../../../../models/fonoaudiologoDisponibilidade';
import { FonoaudiologoDisponibilidadeService } from '../../../../services/fonoaudiologoDisponibilidade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AgendaDisponibilidadeService } from '../../../../services/agenda-disponibilidade.service';
import { AgendaDisponibilidade } from '../../../../models/agenda-disponibilidade';

@Component({
  selector: 'app-disponibilidade-form',
  templateUrl: './disponibilidade-form.component.html',
  styleUrls: ['./disponibilidade-form.component.css'],
  providers: [AgendaDisponibilidadeService]
})
export class DisponibilidadeFormComponent implements OnInit {


    fonoId: number
    constructor(private disponibilidadeService:AgendaDisponibilidadeService,
                private route: ActivatedRoute,
                private router: Router) { }

    

    ngOnInit() {
      this.fonoId = +localStorage.getItem("fonoId")
    }

    onSubmit(f: NgForm) {
      console.log(f.value);  // { first: '', last: '' }
      console.log(f.valid);  // false
      let disponibilidadeList: AgendaDisponibilidade[] = []


      
      let days: Date[] =  this.getDays(f.value.data_inicial,
                                              f.value.data_final,
                                              f.value.dias_semana)
      days.forEach(date =>{
        let d = new AgendaDisponibilidade
        d.dat_atendimento = date
        d.hor_inicio = f.value.horario_inicial
        d.hor_fim = f.value.horario_final
        d.fk_fonoaudiologo = this.fonoId

        disponibilidadeList.push(d)


      })

      this.save(disponibilidadeList)
      

    }

    save(disponibilidadeList: AgendaDisponibilidade[]){
      disponibilidadeList.forEach(disponibilidade =>{
        this.disponibilidadeService.create(disponibilidade).subscribe(
          result=>{
            console.log(result)
          }
        )  
      })

      this.router.navigate(["/sistema/fonoaudiologo/agenda/calendarioDisponibilidade"])
        
    }


    submit() {

      /*
      this.FonoaudiologoDisponibilidadeService.create(this.fonoaudiologoDisponibilidade).subscribe(
        result => {
          console.log(this.fonoaudiologoDisponibilidade)
          
          this.router.navigate(['/sistema/fonoaudiologo/agenda/calendarioDisponibilidade']);
        }
        );
      */
    }


    getDays(inicio:string,fim:string,dias: string[]): Date[]{
      let result: Date[] = []
      const MS_PER_DAY: number = 1000 * 60 * 60 * 24

      const dataInicial: any = new Date(inicio)
      const dataFinal: any = new Date(fim)


      const start: number = dataInicial.getTime()
      const end: number = dataFinal.getTime()
      const daysBetweenDates: number = Math.ceil((end - start) / MS_PER_DAY)
  
      // The days array will contain a Date object for each day between dates (inclusive)
      const days: Date[] = Array.from(new Array(daysBetweenDates + 1), 
      (v, i) => new Date((start) + (i * MS_PER_DAY)))
      console.log(dias)
      days.forEach(date =>{
        if(dias.includes(date.getDay()+"")){
          result.push(date)
          console.log(date)
        }
      });

      return result

    }

    
}
