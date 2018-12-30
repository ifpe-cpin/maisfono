import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
// import { Fono } from '../../../models/fono';
import {Fonoaudiologo} from '../../../models/fonoaudiologo'
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'
import { Router, ActivatedRoute } from '@angular/router';
import { FonoaudiologoService } from '../../../services/fonoaudiologo.service';
import { ResourceServiceInterface } from '../../../services/resource.service.interface';

declare var $:any;

@Component({
  selector: 'app-fono-form',
  templateUrl: './fono-form.component.html',
	styleUrls: ['./fono-form.component.css'],
	providers:[{provide: 'ResourceServiceInterface', useClass: FonoaudiologoService}],
	encapsulation: ViewEncapsulation.None
})
export class FonoFormComponent implements OnInit {

	 fonoaudiologo:Fonoaudiologo;

	constructor(
		public db: AngularFirestore,
		private route: ActivatedRoute,
		private router: Router,
		@Inject('ResourceServiceInterface') private fonoaudiologoService:ResourceServiceInterface<Fonoaudiologo>) { }
	
	
	

  ngOnInit() {
    $(document).ready(function(){  

			$("input[name='add']").click(function( e ){ 
				var id = $(".items").length;
				var teste = $(".0").length;
				var teste1 = $(".1").length;
				var teste2 = $(".2").length;

				if (teste == 0){
				id = 0;
				}else
				if (teste == 1 && teste1 == 0){
				  id = 1;
				}else 
				    if (teste == 1 && teste1 == 1){
				        id = 2;
				    }

				    
				if (teste != 1 || teste1 != 1 || teste2 != 1){

				  var areaCurso = '<div class="row"><div class="col-md-6"><div class="form-group"> <label>Grau de formação<em>*</em></label><select name="escolaridade" id="escolaridade" class="form-control select2" title="Por favor, selecione uma opção." onChange="ativaPosGraduacao(this.value)"required><option value="">--Selecione--</option><option value="1">Graduação</option><option value="2">Pós Graduação</option><option value="3">Mestrado</option><option value="4">Pós doc</option></select></div></div>';

				  var outrosDados = '<div class="col-md-6"><div class="form-group"><label>Curso:</label><input type="text" class="form-control pull-right" id="reservationtime"></div></div><br></div><br>';
				  var nomePeriodo = '<div class="row"><div class="col-md-6">  <div class="form-group"><label>Instituição de Ensino:</label><input type="text" class="form-control pull-right" id="reservationtime"></div></div><div class="col-md-6"><div class="form-group"><label>Data de Conclusão:</label><input type="date" class="form-control pull-right" id="reservation"> </div></div><br></div>'
          ;

				  var input = '<div class="items '+id+'"><br>'+areaCurso+outrosDados+nomePeriodo+'<a href="#" class="remove" style="margin:20px auto; text-align:center; display:block; width:120px;" ><i class="glyphicon glyphicon-trash" ></i></a></div>';


				  $('#formacao').append( input );
				}   
			});  

			$('#formacao').delegate('a','click',function( e ){  
			  e.preventDefault();  
			  $( this ).parent('div').remove();  
			});  

		});  

		this.fonoaudiologo = new Fonoaudiologo();
		
		this.route
		.queryParams
		.subscribe(params => {
			// Defaults to 0 if no query param provided.
			let id = params['id'];

			if(id!= undefined){
					this.fonoaudiologoService.read(id).subscribe(
						fonoaudiologo => this.fonoaudiologo = fonoaudiologo
					);
			}

			
		});
		

	}

	
	
	onSubmit() {

		if(this.fonoaudiologo.id){
			this.fonoaudiologoService.update(this.fonoaudiologo).subscribe(
				result => {
					console.log(result)
					this.router.navigate(['/sistema/fonoaudiologo/ver'],{ queryParams: { id: result.id }});
				});
		}else{
			this.fonoaudiologoService.create(this.fonoaudiologo).subscribe(
				result => {
					this.router.navigate(['/sistema/fonoaudiologo/ver'],{ queryParams: { id: result.id }});
					
				},
				err => console.log(err)
			)
		}

    }
  }








