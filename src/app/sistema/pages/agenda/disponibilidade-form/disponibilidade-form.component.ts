import { Component, OnInit } from '@angular/core';
import { FonoaudiologoDisponibilidade } from '../../../../models/fonoaudiologoDisponibilidade';
import { FonoaudiologoDisponibilidadeService } from '../../../../services/fonoaudiologoDisponibilidade.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-disponibilidade-form',
  templateUrl: './disponibilidade-form.component.html',
  styleUrls: ['./disponibilidade-form.component.css'],
  providers: [FonoaudiologoDisponibilidadeService]
})
export class DisponibilidadeFormComponent implements OnInit {

    constructor(private fonoaudiologoDisponibilidadeService:FonoaudiologoDisponibilidadeService,
                private route: ActivatedRoute,
                private router: Router) { }

    
    fonoaudiologoDisponibilidade: any[];

    ngOnInit() {
     
    }


    incluiDisponibilidade() {
      console.log(this.fonoaudiologoDisponibilidade);

      /*
      this.FonoaudiologoDisponibilidadeService.create(this.fonoaudiologoDisponibilidade).subscribe(
        result => {
          console.log(this.fonoaudiologoDisponibilidade)
          
          this.router.navigate(['/sistema/fonoaudiologo/agenda/calendarioDisponibilidade']);
        }
        );
      */
    }

}
