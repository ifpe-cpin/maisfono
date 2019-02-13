import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { FONOAUDIOLOGO, PACIENTE } from '../../../../models/tipoUsuario';
import { User } from '../../../../models/user';
import { FonoaudiologoService } from '../../../../services/fonoaudiologo.service';
import { PacienteService } from '../../../../services/paciente.service';
import { QueryOptions } from '../../../../models/query-options';
import { PusherService } from '../../../../services/pusher.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers:[UserService,FonoaudiologoService,PacienteService,PusherService]
})
export class UserCreateComponent implements OnInit {


  user:User;
  roles:string[];
  tipos:number[];
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private fonoService:FonoaudiologoService,
    private pacienteService:PacienteService,
    private userService:UserService,
    private pusherService: PusherService) { }

    ngOnInit() {

        this.user = new User();
        this.tipos = [FONOAUDIOLOGO,PACIENTE]

    
        this.route
        .queryParams
        .subscribe(params => {
          console.log(params)
          // Defaults to 0 if no query param provided.
            this.user.id = params['id'];
            this.user.email = params['email'];
            this.user.photoUrl =params['photoUrl'];
            this.user.displayName = params['displayName']; 
            this.user.ultimo_acesso = new Date()

            
            
        });
      }


      onSubmit() {
          
          if(this.user.tipo==FONOAUDIOLOGO){
            this.user.roles = ["admin","fono"]
          }else if(this.user.tipo==PACIENTE){
            this.user.roles = ["admin","paciente"]
          }

          this.userService.create(this.user).subscribe(
            result => {
              console.log(this.user)
              this.setIdTipo(this.user)

              localStorage.setItem('roles', this.user.roles.toString());

              this.pusherService.ausente(this.user.id)
              
              this.router.navigate(['/sistema/dash']);
            }
            );
    
      }


      setIdTipo(user: User){
        if(this.user.isFonoaudiologo()){
                  
          let queryMap = new Map<string,string>()
          queryMap.set("idUser",user.id)

          this.fonoService.list(new QueryOptions(queryMap)).subscribe(
              fonos => {
                   fonos.forEach(
                     fono=>{
                      localStorage.setItem('fonoId', fono.id); 
                      localStorage.setItem('pessoaId', <any>fono.frg_pessoa); 
                     }
                   )
              }
          )
      }else{
        
          let queryMap = new Map<string,string>()
          queryMap.set("idUser",user.id)

          this.pacienteService.list(new QueryOptions(queryMap)).subscribe(
              pacientes => {
                pacientes.forEach(
                  paciente=>{
                   localStorage.setItem('pacienteId', paciente.id); 
                  }
                )
              }
          )
      }

      

      }
    

}
