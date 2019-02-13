import { Component, OnInit } from '@angular/core';
import { FonoaudiologoService } from '../../../../services/fonoaudiologo.service';
import { PacienteService } from '../../../../services/paciente.service';
import { Fonoaudiologo } from '../../../../models/fonoaudiologo';
import { Paciente } from '../../../../models/paciente';
import { Perfil } from '../../../../models/perfil';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [FonoaudiologoService,PacienteService,UserService]
})
export class DashboardComponent implements OnInit {

  fono: Fonoaudiologo
  paciente: Paciente
  perfil: Perfil
  user: User

  constructor(private fonoService:FonoaudiologoService, 
              private pacienteService:PacienteService, 
              private userService:UserService, 
              private router: Router
              ) { }

  ngOnInit() {
    this.paciente = null
    this.fono = null
    this.perfil = new Perfil()

            if(localStorage.getItem('fonoId')!=undefined && localStorage.getItem('fonoId')!=""){

                this.fonoService.read(localStorage.getItem('fonoId')).subscribe(
                  fono => {
                      this.fono = fono
                      this.loadPerfil()
                  }
              );

            }else if(localStorage.getItem('pacienteId')!=undefined && 
                     localStorage.getItem('pacienteId')!=""){

               this.pacienteService.read(localStorage.getItem('pacienteId')).subscribe(
                  paciente => {
                      this.paciente = paciente
                      this.loadPerfil()
                  }
              );
            }
}

loadPerfil(){
  this.userService.read(localStorage.getItem('id')).subscribe(
    user => {
      this.user = user
      this.perfil.photoUrl = user.photoUrl
      this.perfil.nome = user.displayName
      this.perfil.email = user.email
      this.perfil.ultimoAcesso = user.ultimo_acesso

      console.log("Último acesso: "+this.user.ultimo_acesso)
      console.log("Paciente: "+this.paciente)
      
      if(this.fono!=null){
        this.perfil.telefone1 = this.fono.dsc_telefone1
        this.perfil.telefone2 = this.fono.dsc_telefone2
        this.perfil.endereco = this.fono.dsc_endrua+", "+this.fono.dsc_endnum+
        ". "+this.fono.dsc_endbairro
        this.perfil.tipo = "Fonoaudiólogo"
      }else if(this.paciente!=null){
        this.perfil.telefone1 = this.paciente.dsc_telefone1
        this.perfil.telefone2 = this.paciente.dsc_telefone2
        this.perfil.endereco = this.paciente.dsc_endrua+", "
        +this.paciente.dsc_endnum+". "+this.paciente.dsc_endbairro
        this.perfil.tipo = "Paciente"
      }
    }

    
  );
    


}

update(){
  if(this.user.isFonoaudiologo()){
    this.router.navigate(['/sistema/fonoaudiologo/novo'],{queryParams:{id:localStorage.getItem("fonoId")}});
  }else if(this.user.isPaciente()){
    this.router.navigate(['/sistema/paciente/novo'],{queryParams:{id:localStorage.getItem("pacienteId")}});
  }
  
  
}

}
