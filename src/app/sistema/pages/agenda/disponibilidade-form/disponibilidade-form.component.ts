import { Component, OnInit } from '@angular/core';
import { FonoaudiologoDisponibilidade } from '../../../../models/fonoaudiologoDisponibilidade';
import { FonoaudiologoDisponibilidadeService } from '../../../../services/fonoaudiologoDisponibilidade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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

    onSubmit(f: NgForm) {
      console.log(f.value);  // { first: '', last: '' }
      console.log(f.valid);  // false
    }


    submit() {
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
