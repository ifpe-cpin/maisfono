import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FonoaudiologoService } from '../../../services/fonoaudiologo.service';
import { Fonoaudiologo } from '../../../models/fonoaudiologo';
import { ResourceServiceInterface } from '../../../services/resource.service.interface';

@Component({
  selector: 'app-fono-detalhe',
  templateUrl: './fono-detalhe.component.html',
  styleUrls: ['./fono-detalhe.component.css'],
  providers:[{provide: 'ResourceServiceInterface', useClass: FonoaudiologoService}]
})
export class FonoDetalheComponent implements OnInit {

  fono: Fonoaudiologo;


  constructor(
    private route: ActivatedRoute,
    @Inject('ResourceServiceInterface') private fonoService:ResourceServiceInterface<Fonoaudiologo>) { }

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
