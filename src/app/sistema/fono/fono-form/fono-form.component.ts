import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { Fono } from '../../../models/fono';
import {Fonoaudiologo} from '../../../models/fonoaudiologo'
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'
import { Router, ActivatedRoute } from '@angular/router';
import { FonoaudiologoService } from '../../../services/fonoaudiologo.service';

declare var $:any;

@Component({
  selector: 'app-fono-form',
  templateUrl: './fono-form.component.html',
	styleUrls: ['./fono-form.component.css'],
	providers:[FonoaudiologoService],
	encapsulation: ViewEncapsulation.None
})
export class FonoFormComponent implements OnInit {

	fonoaudiologo:Fonoaudiologo={
		dsc_nome: '',
		dat_nascimento: '',
		dsc_cpf: '',
		dsc_crf: '',
		dsc_email: '',
		dsc_endbairro: '',
		dsc_endcep: '',
		dsc_endnum: '',
		dsc_endrua: '',
		dsc_nomemae: '',
		dsc_nomepai: '',
		dsc_telefone1: '',
		dsc_telefone2: '',
		frg_cor: '',
		frg_endestado: '',
		frg_endmunicipio: '',
		frg_endzona: '',
		frg_estadocivil: '',
		frg_estadonascimento: '',
		frg_municipionasc: '',
		frg_nacionalidade: '',
		frg_sexo: '',
		frg_tpsangue: '',        
		arr_cursos: '',
		arr_areas: ''
	}

	constructor(
		public db: AngularFirestore,
		private route: ActivatedRoute,
		private router: Router,
		private fonoaudiologoService:FonoaudiologoService) { }
	
	
	

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

		//this.fonoaudiologo = new Fonoaudiologo();
		/*
		this.fono = new Fono(this.db);

		this.route
		.queryParams
		.subscribe(params => {
			// Defaults to 0 if no query param provided.
			let id = params['id'];

			if(id!= undefined){
					this.fonoService.get(id).subscribe(
						fono => this.fono = fono
					);
			}

			
		});
		*/

	}

	
	
	onSubmit() {

		this.fonoaudiologoService.addFonoaudiologo(this.fonoaudiologo)
		this.fonoaudiologo.dsc_nome = '';
        this.fonoaudiologo.dat_nascimento = '';
        this.fonoaudiologo.dsc_cpf = '';
        this.fonoaudiologo.dsc_crf = '';
        this.fonoaudiologo.dsc_email = '';
        this.fonoaudiologo.dsc_endbairro = '';
        this.fonoaudiologo.dsc_endcep = '';
        this.fonoaudiologo.dsc_endnum = '';
        this.fonoaudiologo.dsc_endrua = '';
        this.fonoaudiologo.dsc_nomemae = '';
        this.fonoaudiologo.dsc_nomepai = '';
        this.fonoaudiologo.dsc_telefone1 = '';
        this.fonoaudiologo.dsc_telefone2 = '';
        this.fonoaudiologo.frg_cor = '';
        this.fonoaudiologo.frg_endestado = '';
        this.fonoaudiologo.frg_endmunicipio = '';
        this.fonoaudiologo.frg_endzona = '';
        this.fonoaudiologo.frg_estadocivil = '';
        this.fonoaudiologo.frg_estadonascimento = '';
        this.fonoaudiologo.frg_municipionasc = '';
        this.fonoaudiologo.frg_nacionalidade = '';
        this.fonoaudiologo.frg_sexo = '';
        this.fonoaudiologo.frg_tpsangue = '';        
        this.fonoaudiologo.arr_cursos = '';
        this.fonoaudiologo.arr_areas = '';

		/*
		if(this.fono.id){
			this.fono.update().subscribe(
				result => {
					console.log(result)
					this.router.navigate(['/sistema/fono/ver'],{ queryParams: { id: result.id }});
				});
		}else{
			
			this.fono.add().then(
				result => {
					console.log(result)
					this.router.navigate(['/sistema/fono/ver'],{ queryParams: { id: result.id }});
				}
				
			);
;
		}
*/
    }
  }








