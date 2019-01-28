import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { PacienteService } from '../../../../services/paciente.service';
import { Paciente } from "../../../../models/paciente";
import { QueryOptions } from '../../../../models/query-options';
import { ResourceServiceInterface } from '../../../../services/resource.service.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css'],
 	providers: [{provide: 'ResourceServiceInterface', useClass: PacienteService}],
   encapsulation: ViewEncapsulation.None
}) 
export class PacienteFormComponent implements OnInit {
   paciente: Paciente;
  

  constructor(
		private route: ActivatedRoute,
		private router: Router,
    @Inject('ResourceServiceInterface') private pacienteService: ResourceServiceInterface<Paciente> ) {}
  
 
    ngOnInit() {
      // $(document).ready(function(){  
  
      //   $("input[name='add']").click(function( e ){ 
      //     var id = $(".items").length;
      //     var teste = $(".0").length;
      //     var teste1 = $(".1").length;
      //     var teste2 = $(".2").length;
  
      //     if (teste == 0){
      //     id = 0;
      //     }else
      //     if (teste == 1 && teste1 == 0){
      //       id = 1;
      //     }else 
      //         if (teste == 1 && teste1 == 1){
      //             id = 2;
      //         }
  
              
      //     if (teste != 1 || teste1 != 1 || teste2 != 1){
  
      //       var grauDeficiecia = '<div class="row"><div class="col-md-6"><div class="form-group"> <label>Grau de Deficiencia<em>*</em></label> <select [(ngModel)]="paciente.arr_deficiencia" name="Deficiencia" id="Deficiencia" class="form-control select2" title="Por favor, selecione uma opção." onChange="ativaPosGraduacao(this.value)"required><option value="">--Selecione--</option><option value="1">Alto</option><option value="2">Moderado</option><option value="3">Leve</option></select></div></div>';
      //       var outrosDados = '<div class="col-md-6"><div class="form-group"> <label>Fonemas:</label><input type="text" class="form-control pull-right" [(ngModel)]="paciente.arr_fonema" name="fonema" id="reservationtime"></div></div><br></div><br>';
            
  
      //       var input = '<div class="items '+id+'"><br>'+grauDeficiecia+outrosDados+'<a href="#" class="remove" style="margin:20px auto; text-align:center; display:block; width:120px;" ><i class="glyphicon glyphicon-trash" ></i></a></div>';
  
  
      //       $('#formacao').append( input );
      //     }   
      //   });  
  
      //   $('#formacao').delegate('a','click',function( e ){  
      //     e.preventDefault();  
      //     $( this ).parent('div').remove();  
      //   });  
  
      // });  
  
      this.paciente = new Paciente();
      
      this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        let id = params['id'];
  
          if(id!= undefined){
              this.pacienteService.read(id).subscribe(
                paciente => this.paciente = paciente
              );
          }

          
        });
    }
  
    
    
  	onSubmit() {

              if(this.paciente.id){
                this.pacienteService.update(this.paciente).subscribe(
                  result => {
                    console.log(result)
                    this.router.navigate(['/sistema/paciente/ver'],{ queryParams: { id: result.id }});
                  });
              }else{
                this.pacienteService.create(this.paciente).subscribe(
                  result => {
                    this.router.navigate(['/sistema/paciente/ver'],{ queryParams: { id: result.id }});
                    console.log("foi");
                  },
                  err => console.log(err)
                )
              }
  
      }
 }
  
  
  
  
  
  
  
  
  