import { Component, OnInit, Input } from '@angular/core';
import { Fono } from '../../../models/fono';
import { ActivatedRoute } from '@angular/router';
import { FonoaudiologoService } from '../../../services/fonoaudiologo.service';
import { Fonoaudiologo } from '../../../models/fonoaudiologo';

@Component({
  selector: 'app-fono-detalhe',
  templateUrl: './fono-detalhe.component.html',
  styleUrls: ['./fono-detalhe.component.css'],
  providers:[FonoaudiologoService]
})
export class FonoDetalheComponent implements OnInit {

  fono: Fonoaudiologo;


  constructor(
    private route: ActivatedRoute,
    private fonoService:FonoaudiologoService) { }

  ngOnInit() {
    
    this.route
		.queryParams
		.subscribe(params => {
			// Defaults to 0 if no query param provided.
			let id = params['id'];

			if(id!= undefined){
					this.fonoService.read(id).subscribe(
						fono => {
              console.log(fono)
              this.fono = fono
            }
					);
			}

			
    });
    
  }

}
