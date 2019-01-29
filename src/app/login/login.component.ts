import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, GoogleLoginProvider} from 'angular5-social-auth';
import { UserService } from '../services/user.service';
import { ResourceServiceInterface } from '../services/resource.service.interface';
import { User } from '../models/user';
import { FonoaudiologoService } from '../services/fonoaudiologo.service';
import { PacienteService } from '../services/paciente.service';
import { Fonoaudiologo } from '../models/fonoaudiologo';
import { Paciente } from '../models/paciente';
import { QueryOptions } from '../models/query-options';
import { PusherService } from '../services/pusher.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
              '../../assets/css/normalize.css',
              '../../assets/css/reset.css',
              '../../assets/css/grid.css',
              '../../assets/css/style.css',
              '../../assets/css/contato.css',
              '../../assets/css/responsivo.css',            
            ],
  providers: [AuthService, FonoaudiologoService,PacienteService,
  {provide: 'ResourceServiceInterface', useClass: UserService},
  PusherService]
})
export class LoginComponent implements OnInit, OnDestroy{
  
  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  user:User;

  constructor(private fonoService:FonoaudiologoService,
              private pacienteService:PacienteService,
              @Inject('ResourceServiceInterface') 
              private userService:ResourceServiceInterface<User>,
              private socialAuthService: AuthService,
              private router: Router,
              private pusherService: PusherService){ 

  }

  public socialSignIn(socialPlatform : string, $scope) {
  
 
    //var app = angular.module('img', []);
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID; 
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
            this.user = new User();

            this.user.id = userData.id
            this.user.email = userData.email
            this.user.photoUrl = userData.image
            this.user.displayName = userData.name

            localStorage.setItem('id', this.user.id);
            localStorage.setItem('email', this.user.email);
            localStorage.setItem('img', this.user.photoUrl);
            localStorage.setItem('name', this.user.displayName);
            

        this.userService.read(userData.id).subscribe(
          user => {
              if(user.id!=undefined){

                this.user.tipo = user.tipo;
                
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

                localStorage.setItem('roles', user.roles.toString());
                this.pusherService.ausente(this.user.id)
                

                
                this.router.navigate(['/sistema/dash'],);
              }else{
                console.log({queryParams:this.user})
                this.router.navigate(['user-create'],{queryParams:this.user});
              }
          }

          
        );
        



      }
    );
  }
  

  ngOnInit() {
    // add the the body classes
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
    
  }

   ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-blue');
    this.body.classList.remove('sidebar-mini');
  }


}
