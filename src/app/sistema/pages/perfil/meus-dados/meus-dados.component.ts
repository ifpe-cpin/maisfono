import { Component, OnInit } from '@angular/core';

declare var $:any;


@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent implements OnInit {

  constructor() { }

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

				  var areaCurso = '<hr><div class="row"><div class="col-md-6"><div class="form-group"><label>Área  <em>*</em></label><select name="area[]" id="area['+id+']" onchange="showCursos(this.value, '+id+')" onChange="ativaCurso(this, '+id+');" class="form-control select2" title="Por favor, selecione uma opção." required ><option value="">--Selecione--</option><option value="1">Educação</option><option value="2">Humanidades e Artes</option><option value="3">Ciências Sociais, Negócios e Direitos</option><option value="4">Ciências, Matemática e Computação</option><option value="5">Engenharia, Produção e Construção</option><option value="6">Agricultura e Veterinária</option><option value="7">Saúde e Bem-Estar Social</option><option value="8">Serviços</option></select></div></div><div class="col-md-6"><div class="form-group"><label>Curso </label><select name="curso[]" id="cursos['+id+']" class="form-control select2" title="Por favor, selecione uma opção."><option value="">--Selecione a Área--</option></select></div></div><br></div>';

				  var outrosDados = '<div class="row"><div class="col-md-4"><div class="form-group"><label>Situação  <em>*</em></label><select name="situacao[]" id="situacao['+id+']" class="form-control select2" title="Por favor, selecione uma opção." required ><option value="">--Selecione--</option><option value="1">Concluído</option><option value="2">Em Andamento</option></select></div></div><div class="col-md-4"> <div class="form-group"> <label>Tipo de Intituição  <em>*</em></label> <select name="tipoInstituicao[]" id="tipoInstituicao" class="form-control select2" title="Por favor, selecione uma opção." required > <option value="">--Selecione--</option> <option value="1">Pública</option> <option value="2">Privada</option> </select> </div> </div> <div class="col-md-4"> <div class="form-group"> <label>Complementação Pedagógica  <em>*</em></label> <select name="formacaoComp[]" id="formacaoCom" class="form-control select2" title="Por favor, selecione uma opção." required ><option value="">--Selecione--</option><option value="1">Sim</option> <option value="2">Não</option> </select> </div> </div><br></div>';

				  var nomePeriodo = '<div class="row"> <div class="col-md-6"> <div class="form-group"> <label>Nome da Intituição  <em>*</em></label> <input type="text" name="instituicao[]" class="form-control" required > </div> </div> <div class="col-md-3"> <div class="form-group"> <label>Tipo de Intituição  <em>*</em></label> <input type="number" name="anoInicio[]" minlength=4 maxlength=4 class="form-control" required > </div> </div> <div class="col-md-3"> <div class="form-group"> <label>Ano Fim  <em>*</em></label> <input type="number" name="anoFim[]" minlength=4 maxlength=4 class="form-control" required > </div> </div> <br> </div>';

				  var input = '<div class="items '+id+'"><br>'+areaCurso+outrosDados+nomePeriodo+'<a href="#" class="remove" style="margin:20px auto; text-align:center; display:block; width:120px;" ><i class="glyphicon glyphicon-trash" ></i></a></div>';


				  $('#formacao').append( input );
				}   
			});  

			$('#formacao').delegate('a','click',function( e ){  
			  e.preventDefault();  
			  $( this ).parent('div').remove();  
			});  

		});  
  }

}
